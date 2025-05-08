Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnthropicApiKey = getAnthropicApiKey;
exports.parseMCPJson = parseMCPJson;
exports.getServerNames = getServerNames;
exports.getMcpParams = getMcpParams;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * Anthropic APIキーを環境変数から取得します
 *
 * @returns 設定されたAnthropic APIキー
 * @throws {Error} APIキーが環境変数に設定されていない場合
 */
function getAnthropicApiKey() {
  dotenv_1.default.config();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Anthropic API key is not set in the environment variables.",
    );
  }
  return apiKey;
}
/**
 * 指定されたパスからMCP設定用JSONファイルを読み込み、パースします
 *
 * @param mcpJsonPath - MCPサーバー設定ファイルへのパス
 * @returns パースされたJSONオブジェクト
 * @throws {Error} パスが空の場合
 * @throws {Error} ファイルの読み込みやパースに失敗した場合
 */
function parseMCPJson(mcpJsonPath) {
  if (!mcpJsonPath) {
    throw new Error("MCP JSON path is not set in the environment variables.");
  }
  try {
    const resolvedPath = path_1.default.resolve(__dirname, mcpJsonPath);
    const fileContents = fs_1.default.readFileSync(resolvedPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    throw new Error(
      `Failed to parse MCP JSON file: ${error.message || "Unknown error"}`,
    );
  }
}
/**
 * パースされたMCP JSONからサービス名のリストを取得します
 *
 * @param mcpJson - パースされたMCP JSON
 * @returns サービス名の配列
 */
function getServerNames(mcpJson) {
  return Object.keys(mcpJson.mcpServers);
}
/**
 * 指定されたサーバー名とパラメータタイプに対応する値を取得します
 *
 * @param mcpJson - パースされたMCP JSON
 * @param serverName - サーバー名
 * @param paramType - 取得するパラメータのタイプ ("command", "args", "env")
 * @returns {object} 要求されたパラメータを含むオブジェクト
 * @throws {Error} 指定されたサーバーが存在しない場合
 */
function getMcpParams(mcpJson, serverName, paramType) {
  const serverConfig = mcpJson.mcpServers[serverName];
  if (!serverConfig) {
    throw new Error(`Server ${serverName} not found in MCP JSON`);
  }
  switch (paramType) {
    case "command":
      return { command: serverConfig.command };
    case "args":
      return { args: serverConfig.args };
    case "env":
      return { env: serverConfig.env || {} };
    default:
      throw new Error(`Unknown parameter type: ${paramType}`);
  }
}
//# sourceMappingURL=config.js.map
