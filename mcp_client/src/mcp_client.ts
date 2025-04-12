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
 *
 * AnthropicのAPIと連携し、MCPサーバーとのインターフェースを提供します
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

}
