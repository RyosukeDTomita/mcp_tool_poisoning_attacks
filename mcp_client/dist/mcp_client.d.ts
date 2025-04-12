/**
 * MCP（Model Context Protocol）クライアントクラス
 *
 * AnthropicのAPIと連携し、MCPサーバーとのインターフェースを提供します
 */
export declare class MCPClient {
    private anthropic;
    private mcp;
    private transport;
    private tools;
    /**
     * MCPClientのコンストラクタ
     *
     * @param ANTHROPIC_API_KEY - Anthropic APIの認証キー
     * @throws Error - ANTHROPIC_API_KEYが指定されていない場合
     */
    constructor(ANTHROPIC_API_KEY: string);
    /**
     * MCPサーバーに接続し，ツールリストを取得する
     * @param mcpJson - MCPサーバー設定ファイルをパースしたJSON
     * @param serverName - サーバー名
     * @returns Tool[] - ツールのリスト
     */
    initialConnect(mcpJson: any, serverName: string): Promise<void>;
    /**
     * Anthropic APIを叩いてユーザのメッセージをもとに適切なツールを選択する。
     * 適切なツールがない場合は、Anthropic APIのレスポンスをそのまま返す
     * @param userMessage
     */
    callAnthropicApi(userMessage: string): Promise<void>;
}
