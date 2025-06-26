/**
 * mcpservers.jsonからMCPサーバーの名前を取得する
 *
 * @param mcpJsonPath MCPサーバー設定ファイルのパス
 * @returns {string[]} サーバー名の配列
 */
export declare function getMcpServerNames(mcpJsonPath: string): string[];
/**
 * 指定されたサーバー名に対応するMCPサーバへの接続パラメータを取得する
 *
 * @param mcpJsonPath mcpservers.jsonのパス
 * @param serverName サーバー名
 * @returns コマンド実行形式の場合はオブジェクト、URL形式の場合は文字列を返す
 * @throws {Error} サーバーが存在しない場合、または設定が不正な場合
 */
export declare function getMcpParams(mcpJsonPath: string, serverName: string): {
    command: string;
    args: string[];
    env: Record<string, string>;
} | string;
