Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPClient = void 0;
/**
 * MCP（Model Context Protocol）クライアントクラス
 *
 * AnthropicのAPIと連携し、MCPサーバーとのインターフェースを提供します
 */
class MCPClient {
    anthropic;
    mcp;
    toolList = [];
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
        // this.anthropic = new Anthropic({
        //   apiKey: ANTHROPIC_API_KEY,
        // });
        // this.mcp = new Client({ name: "mcp-client", version: "0.0.1" });
    }
}
exports.MCPClient = MCPClient;
//# sourceMappingURL=mcp_client.js.map
