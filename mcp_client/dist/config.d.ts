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
export declare function getServerNames(mcpJson: any): string[];
/**
 * 指定されたサーバー名とパラメータタイプに対応する値を取得します
 *
 * @param mcpJson - パースされたMCP JSON
 * @param serverName - サーバー名
 * @param paramType - 取得するパラメータのタイプ ("command", "args", "env")
 * @returns {object} 要求されたパラメータを含むオブジェクト
 * @throws {Error} 指定されたサーバーが存在しない場合
 */
export declare function getMcpParams(
  mcpJson: any,
  serverName: string,
  paramType: string,
): {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
};
