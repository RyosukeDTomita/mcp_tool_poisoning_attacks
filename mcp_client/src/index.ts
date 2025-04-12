import { MCPClient } from "./mcp_client";
import { getAnthropicApiKey, parseMCPJson, getServerNames } from "./config";

async function main() {
  const apiKey = getAnthropicApiKey();
  const mcpJsonPath = "../mcpservers.json";
  const mcpJson = parseMCPJson(mcpJsonPath);
  const serverNames = getServerNames(mcpJson);
  const serverName = serverNames[0]; // TODO: 一旦1つのサーバのみで動作するようにする

  const mcpClient = new MCPClient(apiKey);
  await mcpClient.initialConnect(mcpJson, serverName);
  await mcpClient.callAnthropicApi(
    "RyosukeDTomita/memoにhogeというissueを作成して",
  );
  // ユーザからの入力をを受け取る
  // ユーザからのメッセージ + toolの情報を含んだリクエストを作成し，Anthropic APIを叩く
  // レスポンスから使用可能なツールを選択し，ツールを使用する。使用可能なツールがない場合は，Anthropic APIのレスポンスをそのまま返す
}

main();
