import fs from "fs";
import path from "path";

// 型定義
interface McpServerCommand {
  command: string;
  args: string[];
  env: Record<string, string>;
}

interface McpServerUrl {
  url: string;
}

interface McpServersConfig {
  mcpServers: Record<string, McpServerCommand | McpServerUrl>;
}

/**
 * mcpservers.jsonのバリデーションチェックを行い，問題なしならJSONオブジェクトを返す
 *
 * @param mcpJsonPath mcpservers.jsonのパス
 * @returns {McpServersConfig} パースされたJSONオブジェクト
 * @throws {Error} パスが無効な場合
 * @throws {Error} ファイルの読み込みやパースに失敗した場合
 */
function readMcpJson(mcpJsonPath: string): McpServersConfig {
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
export function getMcpServerNames(mcpJsonPath: string): string[] {
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
export function getMcpParams(
  mcpJsonPath: string,
  serverName: string,
):
  | {
      command: string;
      args: string[];
      env: Record<string, string>;
    }
  | string {
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
