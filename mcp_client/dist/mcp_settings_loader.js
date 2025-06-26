Object.defineProperty(exports, "__esModule", { value: true });
exports.getMcpServerNames = getMcpServerNames;
exports.getMcpParams = getMcpParams;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * mcpservers.jsonのバリデーションチェックを行い，問題なしならJSONオブジェクトを返す
 *
 * @param mcpJsonPath mcpservers.jsonのパス
 * @returns {McpServersConfig} パースされたJSONオブジェクト
 * @throws {Error} パスが無効な場合
 * @throws {Error} ファイルの読み込みやパースに失敗した場合
 */
function readMcpJson(mcpJsonPath) {
  // mcpJsonPathが有効化確認
  const resolvedPath = path_1.default.resolve(mcpJsonPath);
  if (!fs_1.default.existsSync(resolvedPath)) {
    throw new Error(`File not found: ${resolvedPath}`);
  }
  // JSONの形式が正しいか確認
  const fileContents = fs_1.default.readFileSync(resolvedPath, "utf8");
  try {
    const json = JSON.parse(fileContents);
    return json;
  } catch (error) {
    throw new Error(
      `Failed to parse MCP JSON file: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
/**
 * mcpservers.jsonからMCPサーバーの名前を取得する
 *
 * @param mcpJsonPath MCPサーバー設定ファイルのパス
 * @returns {string[]} サーバー名の配列
 */
function getMcpServerNames(mcpJsonPath) {
  const mcpJson = readMcpJson(mcpJsonPath);
  return Object.keys(mcpJson.mcpServers);
}
/**
 * 指定されたサーバー名に対応するMCPサーバへの接続パラメータを取得する
 *
 * @param mcpJsonPath mcpservers.jsonのパス
 * @param serverName サーバー名
 * @returns コマンド実行形式の場合はオブジェクト、URL形式の場合は文字列を返す
 * @throws {Error} サーバーが存在しない場合、または設定が不正な場合
 */
function getMcpParams(mcpJsonPath, serverName) {
  const mcpJson = readMcpJson(mcpJsonPath);
  // サーバーが存在するかチェック
  const serverConfig = mcpJson.mcpServers[serverName];
  if (!serverConfig) {
    throw new Error(`Server '${serverName}' not found in MCP configuration`);
  }
  // commandが定義されている場合（コマンド実行形式）
  if ("command" in serverConfig && serverConfig.command) {
    return {
      command: serverConfig.command,
      args: serverConfig.args || [],
      env: serverConfig.env || {},
    };
  }
  // urlが定義されている場合（URL形式）
  if ("url" in serverConfig && serverConfig.url) {
    return serverConfig.url;
  }
  // どちらも定義されていない場合はエラー
  throw new Error(
    `Server '${serverName}' has invalid configuration: neither 'command' nor 'url' is defined`,
  );
}
//# sourceMappingURL=mcp_settings_loader.js.map
