import { MCPClient } from "./client/mcp_client";
import { getMcpServerNames } from "./client/mcp_settings_loader";
import { getAnthropicApiKey } from "./config";
import readline from "readline/promises";
import path from "path";

/**
 * ユーザからのメッセージを取得する
 * @returns ユーザのメッセージ
 */
async function getUserMessage(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const userMessage = await rl.question("Enter your message: ");
  rl.close();
  return userMessage;
}

async function main() {
  const apiKey = getAnthropicApiKey();
  const mcpJsonPath = path.resolve(__dirname, "../mcpservers.json");
  const serverNames = getMcpServerNames(mcpJsonPath);
  const serverName = serverNames[0]; // TODO: 一旦，1つのサーバのみで動作するようにする

  const userMessage = await getUserMessage();

  await MCPClient.session(async (mcpClient: MCPClient) => {
    await mcpClient.execute(apiKey, mcpJsonPath, userMessage, serverName);
    
    // ログを出力
    const logs = mcpClient.getLogs();
    console.log("\n===== Execution Log =====");
    logs.forEach(log => console.log(log));
  });
}

if (require.main === module) {
  main();
}
