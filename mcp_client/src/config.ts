import dotenv from "dotenv";
import fs from "fs";
import path from "path";

/**
 * Anthropic APIキーを環境変数から取得します
 *
 * @returns 設定されたAnthropic APIキー
 * @throws {Error} APIキーが環境変数に設定されていない場合
 */
export function getAnthropicApiKey() {
  dotenv.config();
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
export function parseMCPJson(mcpJsonPath: string) {
  if (!mcpJsonPath) {
    throw new Error("MCP JSON path is not set in the environment variables.");
  }

  try {
    const resolvedPath = path.resolve(__dirname, mcpJsonPath);
    const fileContents = fs.readFileSync(resolvedPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error: any) {
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
export function getServerNames(mcpJson: any): string[] {
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
export function getMcpParams(
  mcpJson: any,
  serverName: string,
  paramType: string,
): { command?: string; args?: string[]; env?: Record<string, string> } {
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
