import { Anthropic } from "@anthropic-ai/sdk";
import {
  MessageParam,
  Tool,
} from "@anthropic-ai/sdk/resources/messages/messages.mjs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";
import { getMcpParams } from "./config";

/**
 * MCP（Model Context Protocol）クライアントクラス
 */
export class MCPClient {
  private anthropic: Anthropic;
  private mcp: Client;
  private transport!: StdioClientTransport; // definite assignment assertion
  private tools: Tool[] = [];

  /**
   * MCPClientのコンストラクタ
   *
   * @param ANTHROPIC_API_KEY - Anthropic APIの認証キー
   * @throws Error - ANTHROPIC_API_KEYが指定されていない場合
   */
  constructor(ANTHROPIC_API_KEY: string) {
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is required");
    }

    this.anthropic = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
    this.mcp = new Client({ name: "mcp-client", version: "0.0.1" });
  }

  /**
   * toolsプロパティのゲッター
   * @returns Tool[] - ツールのリスト
   */
  getTools(): Tool[] {
    return this.tools;
  }

  /**
   * MCPサーバーに接続し，ツールリストを取得する
   * @param mcpJson - MCPサーバー設定ファイルをパースしたJSON
   * @param serverName - サーバー名
   * @returns Tool[] - ツールのリスト
   */
  async initialConnect(mcpJson: any, serverName: string) {
    const command = getMcpParams(mcpJson, serverName, "command").command;
    if (!command) {
      throw new Error(`Command for server ${serverName} is not defined`);
    }
    const args = getMcpParams(mcpJson, serverName, "args").args || [];
    const env = getMcpParams(mcpJson, serverName, "env").env || {};

    // MCPサーバーに接続する
    this.transport = new StdioClientTransport({
      command: command,
      args: args,
      env: env,
    });
    try {
      await this.mcp.connect(this.transport);
      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
        };
      });
    } catch (error) {
      console.error("Failed to connect to MCP server:", error);
      throw error;
    }
    console.log("Tools:\n", this.tools);
  }

  /**
   * ユーザからのメッセージを取得する
   * @returns ユーザのメッセージ
   */
  async getUserMessage(): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const userMessage = await rl.question("Enter your message: ");
    rl.close();
    return userMessage;
  }

  /**
   * Anthropic APIを叩いてユーザのメッセージをもとに適切なツールを選択する。
   * 適切なツールがない場合は、Anthropic APIのレスポンスをそのまま返す
   * @param userMessage
   */
  async callAnthropicApi(userMessage: string) {
    const messages: MessageParam[] = [
      {
        role: "user",
        content: userMessage,
      },
    ];
    // console.log("=====Request to Anthoropic API=====\n", messages);

    // ユーザの入力をもとにどのツールを使うべきかを決定するためにAnthropic APIを叩く
    const response = await this.anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1000,
      messages,
      tools: this.tools,
    });
    // console.log("=====Response from Anthropic API=====:\n", response);

    for (const content of response.content) {
      if (content.type === "text") {
        console.log(content.text);
        continue;
      }
      if (content.type === "tool_use") {
        const toolName = content.name;
        const toolArgs = content.input as { [x: string]: unknown } | undefined;

        // MCP Serverのツールを実行する
        const toolResult = await this.mcp.callTool({
          name: toolName,
          arguments: toolArgs,
        });
        console.log("=====MCP Server Tool result=====\n:", toolResult);

        messages.push({
          role: "user",
          content: toolResult.content as string,
        });

        const toolResultFeedBack = await this.anthropic.messages.create({
          model: "claude-3-5-haiku-20241022",
          max_tokens: 1000,
          messages,
        });
        // textのレスポンスなら内容を出力，tool_use等之レスポンスならno text responseを出力する
        console.log(
          "=====Response from Anthropic API after tool use=====\n",
          toolResultFeedBack.content[0].type === "text"
            ? toolResultFeedBack.content[0].text
            : "not text response",
        );
      }
    }
  }
  /**
   * MCPClientのクリーンアップ処理
   */
  async cleanUp() {
    await this.mcp.close();
  }
}
