/**
 * Anthropic APIキーを環境変数から取得します
 *
 * @returns 設定されたAnthropic APIキー
 * @throws {Error} APIキーが環境変数に設定されていない場合
 */
export declare function getAnthropicApiKey(): string;
/**
 * 指定されたパスからMCP設定用JSONファイルを読み込み、パースします
 *
 * @param mcpJsonPath - MCPサーバー設定ファイルへのパス
 * @returns パースされたJSONオブジェクト
 * @throws {Error} パスが空の場合
 * @throws {Error} ファイルの読み込みやパースに失敗した場合
 */
export declare function parseMCPJson(mcpJsonPath: string): any;
/**
 * パースされたMCP JSONからサービス名のリストを取得します
 *
 * @param mcpJson - パースされたMCP JSON
 * @returns サービス名の配列
 */
export declare function getServiceNames(mcpJson: any): string[];
/**
 * 指定されたサービスに対応するMCPサーバーコマンドを生成します
 *
 * @param mcpJson - パースされたMCP JSON
 * @param serviceName - サービス名
 * @returns MCP サーバーを起動するコマンド
 * @throws {Error} 指定されたサービスが存在しない場合
 */
export declare function createMcpServerCommand(mcpJson: any, serviceName: string): string;
