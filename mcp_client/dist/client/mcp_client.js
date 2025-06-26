'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPClient = void 0;
const sdk_1 = require("@anthropic-ai/sdk");
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
const mcp_settings_loader_1 = require("./mcp_settings_loader");
/**
 * MCP（Model Context Protocol）クライアントクラス
 */
class MCPClient {
    anthropic; // definite assignment assertion
    mcp;
    transport; // definite assignment assertion
    logs = []; // ログを蓄積する配列
    /**
     * MCPClientのコンストラクタ
     */
    constructor() {
        this.mcp = new index_js_1.Client({ name: "mcp-client", version: "0.0.1" });
    }
    /**
     * ログを取得する
     * @returns ログの配列
     */
    getLogs() {
        return [...this.logs]; // コピーを返す
    }
    /**
     * ログをクリアする
     */
    clearLogs() {
        this.logs = [];
    }
    /**
     * ログを追加する
     * @param message - ログメッセージ
     */
    addLog(message) {
        this.logs.push(message);
    }
    /**
     * セッション管理付きでMCPClientを実行する
     * MCPサーバーへの接続、ツールリスト取得、Anthropic API呼び出しを1回で実行
     * @param callback - MCPClientインスタンスを受け取る関数
     */
    static async session(callback) {
        const mcpClient = new MCPClient();
        try {
            await callback(mcpClient);
        }
        catch (error) {
            console.error("Error during MCPClient:", error);
            throw error;
        }
        finally {
            await mcpClient.cleanUp();
        }
    }
    /**
     * MCPサーバーへの接続からAnthropc API呼び出しまでを一括実行
     * @param apiKey - Anthropic APIキー
     * @param mcpJsonPath - MCP設定ファイルのパス
     * @param userMessage - ユーザーメッセージ
     * @param serverName - サーバー名（デフォルト: "ipinfo"）
     */
    async execute(apiKey, mcpJsonPath, userMessage, serverName = "ipinfo") {
        // Anthropic APIキーを設定
        this.anthropic = new sdk_1.Anthropic({
            apiKey: apiKey,
        });
        // MCPサーバーに接続
        await this.initialConnect(mcpJsonPath, serverName);
        // ツールリストを取得
        const tools = await this.listTools();
        // Anthropic APIを呼び出してツールを実行
        await this.callAnthropicApi(userMessage, tools);
    }
    /**
     * MCPサーバーに接続する
     * @param mcpJsonPath - MCPサーバー設定ファイルのパス
     * @param serverName - サーバー名
     */
    async initialConnect(mcpJsonPath, serverName) {
        const mcpParams = (0, mcp_settings_loader_1.getMcpParams)(mcpJsonPath, serverName);
        // コマンド実行形式の場合
        if (typeof mcpParams === "object") {
            const { command, args, env } = mcpParams;
            // MCPサーバーに接続する
            this.transport = new stdio_js_1.StdioClientTransport({
                command: command,
                args: args,
                env: env,
            });
        }
        else {
            // URL形式の場合（現在は未実装）
            throw new Error("URL-based MCP servers are not yet supported");
        }
        try {
            this.mcp = new index_js_1.Client({ name: "mcp-client", version: "0.0.1" });
            await this.mcp.connect(this.transport);
            this.addLog("Successfully connected to MCP server");
        }
        catch (error) {
            console.error("Failed to connect to MCP server:", error);
            throw error;
        }
    }
    /**
     * MCPサーバーからツールリストを取得する
     * @returns Tool[] - ツールのリスト
     */
    async listTools() {
        try {
            const toolsResult = await this.mcp.listTools();
            const tools = toolsResult.tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    input_schema: tool.inputSchema,
                };
            });
            this.addLog("Tools:\n" + JSON.stringify(tools, null, 2));
            return tools;
        }
        catch (error) {
            console.error("Failed to list tools:", error);
            throw error;
        }
    }
    /**
     * Anthropic APIを叩いてユーザのメッセージをもとに適切なツールを選択する。
     * 適切なツールがない場合は、Anthropic APIのレスポンスをそのまま返す
     * @param userMessage - ユーザのメッセージ
     * @param tools - 使用可能なツールのリスト
     */
    async callAnthropicApi(userMessage, tools) {
        const messages = [
            {
                role: "user",
                content: userMessage,
            },
        ];
        this.addLog("=====Request to Anthropic API=====\n" + JSON.stringify(messages, null, 2));
        // ユーザの入力をもとにどのツールを使うべきかを決定するためにAnthropic APIを叩く
        const response = await this.anthropic.messages.create({
            model: "claude-3-5-haiku-20241022",
            max_tokens: 1000,
            messages,
            tools: tools,
        });
        this.addLog("=====Response from Anthropic API=====:\n" + JSON.stringify(response, null, 2));
        for (const content of response.content) {
            if (content.type === "text") {
                this.addLog(content.text);
                continue;
            }
            if (content.type === "tool_use") {
                const toolName = content.name;
                const toolArgs = content.input;
                // MCP Serverのツールを実行する
                const toolResult = await this.mcp.callTool({
                    name: toolName,
                    arguments: toolArgs,
                });
                this.addLog("=====MCP Server Tool result=====\n" + JSON.stringify(toolResult, null, 2));
                messages.push({
                    role: "user",
                    content: toolResult.content,
                });
                const toolResultFeedBack = await this.anthropic.messages.create({
                    model: "claude-3-5-haiku-20241022",
                    max_tokens: 1000,
                    messages,
                });
                // textのレスポンスなら内容を出力，tool_use等之レスポンスならno text responseを出力する
                this.addLog("=====Response from Anthropic API after tool use=====\n" +
                    (toolResultFeedBack.content[0].type === "text"
                        ? toolResultFeedBack.content[0].text
                        : "not text response"));
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
exports.MCPClient = MCPClient;
//# sourceMappingURL=mcp_client.js.map
