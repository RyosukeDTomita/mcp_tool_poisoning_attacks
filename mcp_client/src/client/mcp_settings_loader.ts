import fs from "fs";
import path from "path";
/**
 * mcpservers.jsonのバリデーションチェックを行い，問題なしならJSONオブジェクトを返す
 *
 * @param mcpJsonPath mcpservers.jsonのパス
 * @returns {any} パースされたJSONオブジェクト
 * @throws {Error} パスが無効な場合
 * @throws {Error} ファイルの読み込みやパースに失敗した場合
 */
function readMcpJson(mcpJsonPath: string) {
  // mcpJsonPathが有効化確認
  const resolvedPath = path.resolve(mcpJsonPath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File not found: ${resolvedPath}`);
  }
  // JSONの形式が正しいか確認
  const fileContents = fs.readFileSync(resolvedPath, "utf8");
  try {
    const json = JSON.parse(fileContents);
    return json;
  } catch (error) {
    throw new Error(
      `Failed to parse MCP JSON file: ${error.message || "Unknown error"}`,
    );
  }
}

/**
 * mcpservers.jsonからMCPサーバーの名前を取得する
 *
 * @param mcpJsonPath - MCPサーバー設定ファイルをパースしたJSON
 * @returns {string[]} サーバー名の配列
 */
export function getMcpServerNames(mcpJsonPath: string): string[] {
  const mcpJson = readMcpJson(mcpJsonPath);
  return Object.keys(mcpJson.mcpServers);
}

/**
 * 指定されたサーバー名に対応するMCPサーバへの接続パラメータを取得する
 *
 * @param mcpJsonPath mcpservers.jsonのパス
 * @param serverName サーバー名
 * @returns {object} 要求されたパラメータを含むオブジェクト
 */
export function getMcpParams(
  mcpJsonPath: string,
  serverName: string,
):
  | {
      command: string;
      args: string[];
      env: { [key: string]: string };
    }
  | string {
  const mcpJson = readMcpJson(mcpJsonPath);
  // commandが定義されているか確認
  if (mcpJson.mcpServers[serverName].command) {
    const command = mcpJson.mcpServers[serverName].command;
    const args = mcpJson.mcpServers[serverName].args || [];
    const env = mcpJson.mcpServers[serverName].env || {};
    return {
      command: command,
      args: args,
      env: env,
    };
  } else if (mcpJson.mcpServers[serverName].url) {
    return mcpJson.mcpServers[serverName].url;
  } else {
    throw new Error(`serverName ${serverName} is not valid mcpservers config`);
  }
}
