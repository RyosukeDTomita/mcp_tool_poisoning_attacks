Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPClient = void 0;
const sdk_1 = require("@anthropic-ai/sdk");
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
/**
 * MCP（Model Context Protocol）クライアントクラス
 *
 * AnthropicのAPIと連携し、MCPサーバーとのインターフェースを提供します
 */
class MCPClient {
    anthropic;
    mcp;
    /**
     * MCPClientのコンストラクタ
     *
     * @param ANTHROPIC_API_KEY - Anthropic APIの認証キー
     */
    constructor(ANTHROPIC_API_KEY) {
        this.anthropic = new sdk_1.Anthropic({
            apiKey: ANTHROPIC_API_KEY,
        });
        this.mcp = new index_js_1.Client({ name: "mcp-client", version: "0.0.1" });
    }
}
exports.MCPClient = MCPClient;
//# sourceMappingURL=mcp_client.js.map
