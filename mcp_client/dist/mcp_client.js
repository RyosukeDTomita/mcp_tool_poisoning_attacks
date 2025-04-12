Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPClient = void 0;
const sdk_1 = require("@anthropic-ai/sdk");
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
const config_1 = require("./config");
/**
 * MCP（Model Context Protocol）クライアントクラス
 *
 * AnthropicのAPIと連携し、MCPサーバーとのインターフェースを提供します
 */
class MCPClient {
    anthropic;
    mcp;
    transport; // definite assignment assertion
    tools = [];
    /**
     * MCPClientのコンストラクタ
     *
     * @param ANTHROPIC_API_KEY - Anthropic APIの認証キー
     * @throws Error - ANTHROPIC_API_KEYが指定されていない場合
     */
    constructor(ANTHROPIC_API_KEY) {
        if (!ANTHROPIC_API_KEY) {
            throw new Error("ANTHROPIC_API_KEY is required");
        }
        this.anthropic = new sdk_1.Anthropic({
            apiKey: ANTHROPIC_API_KEY,
        });
        this.mcp = new index_js_1.Client({ name: "mcp-client", version: "0.0.1" });
    }
    /**
     * MCPサーバーに接続し，ツールリストを取得する
     * @param mcpJson - MCPサーバー設定ファイルをパースしたJSON
     * @param serverName - サーバー名
     * @returns Tool[] - ツールのリスト
     */
    async initialConnect(mcpJson, serverName) {
        const command = (0, config_1.getMcpParams)(mcpJson, serverName, "command").command;
        if (!command) {
            throw new Error(`Command for server ${serverName} is not defined`);
        }
        const args = (0, config_1.getMcpParams)(mcpJson, serverName, "args").args || [];
        const env = (0, config_1.getMcpParams)(mcpJson, serverName, "env").env || {};
        // MCPサーバーに接続する
        this.transport = new stdio_js_1.StdioClientTransport({
            command: command,
            args: args,
            env: env,
        });
        // トランスポートを使用してMCPサーバーに接続
        await this.mcp.connect(this.transport);
        const toolsResult = await this.mcp.listTools();
        this.tools = toolsResult.tools.map((tool) => {
            return {
                name: tool.name,
                description: tool.description,
                input_schema: tool.inputSchema,
            };
        });
        console.log("Tools:\n", this.tools);
        return this.tools;
    }
}
exports.MCPClient = MCPClient;
//# sourceMappingURL=mcp_client.js.map
