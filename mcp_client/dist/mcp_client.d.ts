/**
 * MCP（Model Context Protocol）クライアントクラス
 *
 * AnthropicのAPIと連携し、MCPサーバーとのインターフェースを提供します
 */
export declare class MCPClient {
    private anthropic;
    private mcp;
    /**
     * MCPClientのコンストラクタ
     *
     * @param ANTHROPIC_API_KEY - Anthropic APIの認証キー
     */
    constructor(ANTHROPIC_API_KEY: string);
}
