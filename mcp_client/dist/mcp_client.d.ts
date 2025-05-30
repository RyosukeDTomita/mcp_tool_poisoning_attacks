import { Tool } from "@anthropic-ai/sdk/resources/messages/messages.mjs";
/**
 * MCP（Model Context Protocol）クライアントクラス
 */
export declare class MCPClient {
    private anthropic;
    private mcp;
    private transport;
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
    initialConnect(mcpJson: any, serverName: string): Promise<Tool[]>;
    /**
     * ユーザからのメッセージを取得する
     * @returns ユーザのメッセージ
     */
    getUserMessage(): Promise<string>;
    /**
     * Anthropic APIを叩いてユーザのメッセージをもとに適切なツールを選択する。
     * 適切なツールがない場合は、Anthropic APIのレスポンスをそのまま返す
     * @param userMessage - ユーザのメッセージ
     * @param tools - 使用可能なツールのリスト
     */
    callAnthropicApi(userMessage: string, tools: Tool[]): Promise<void>;
    /**
     * MCPClientのクリーンアップ処理
     */
    cleanUp(): Promise<void>;
}
