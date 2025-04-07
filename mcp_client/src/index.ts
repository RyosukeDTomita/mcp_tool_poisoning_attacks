import { MCPClient } from "./mcp_client";
import { getAnthropicApiKey } from "./config";

async function main() {
  const apiKey = getAnthropicApiKey();
  const mcpClient = new MCPClient(apiKey);
  // MCP Serverの起動
  // ユーザからの入力をAnthropic APIに送信
  // MCP Serverへのリクエストに使うJSON?を作成
  // MCP Serverにリクエストを送信する。
  // MCP Serverからのレスポンスを受け取る
  // TODO: 処理に失敗した場合とかループしたほうが良さそうだけど，めんどいので一旦これで
}

main();
