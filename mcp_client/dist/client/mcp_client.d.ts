import { Tool } from "@anthropic-ai/sdk/resources/messages/messages.mjs";
/**
 * MCP（Model Context Protocol）クライアントクラス
 */
export declare class MCPClient {
    private anthropic;
    private mcp;
    private transport;
    private logs;
    /**
     * MCPClientのコンストラクタ
     */
    constructor();
    /**
     * ログを取得する
     * @returns ログの配列
     */
    getLogs(): string[];
    /**
     * ログをクリアする
     */
    clearLogs(): void;
    /**
     * ログを追加する
     * @param message - ログメッセージ
     */
    private addLog;
    /**
     * セッション管理付きでMCPClientを実行する
     * MCPサーバーへの接続、ツールリスト取得、Anthropic API呼び出しを1回で実行
     * @param callback - MCPClientインスタンスを受け取る関数
     */
    static session(callback: (mcpClient: MCPClient) => Promise<void>): Promise<void>;
    /**
     * MCPサーバーへの接続からAnthropc API呼び出しまでを一括実行
     * @param apiKey - Anthropic APIキー
     * @param mcpJsonPath - MCP設定ファイルのパス
     * @param userMessage - ユーザーメッセージ
     * @param serverName - サーバー名（デフォルト: "ipinfo"）
     */
    execute(apiKey: string, mcpJsonPath: string, userMessage: string, serverName?: string): Promise<void>;
    /**
     * MCPサーバーに接続する
     * @param mcpJsonPath - MCPサーバー設定ファイルのパス
     * @param serverName - サーバー名
     */
    initialConnect(mcpJsonPath: string, serverName: string): Promise<void>;
    /**
     * MCPサーバーからツールリストを取得する
     * @returns Tool[] - ツールのリスト
     */
    listTools(): Promise<Tool[]>;
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
