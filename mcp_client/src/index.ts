import { MCPClient, parseMCPJson } from "./client/mcp_client";
import { getAnthropicApiKey, getServerNames } from "./config";
import readline from "readline/promises";

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
  const mcpJsonPath = "../mcpservers.json";
  const mcpJson = parseMCPJson(mcpJsonPath);
  const serverNames = getServerNames(mcpJson);
  const serverName = serverNames[0]; // TODO: 一旦1つのサーバのみで動作するようにする

  const mcpClient = new MCPClient(apiKey);
  try {
    const tools = await mcpClient.initialConnect(mcpJson, serverName);
    const userMessage = await getUserMessage();
    await mcpClient.callAnthropicApi(userMessage, tools);
  } finally {
    await mcpClient.cleanUp();
  }
}

main();
