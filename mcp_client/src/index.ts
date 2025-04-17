import { MCPClient } from "./mcp_client";
import { getAnthropicApiKey, parseMCPJson, getServerNames } from "./config";

async function main() {
  const apiKey = getAnthropicApiKey();
  const mcpJsonPath = "../mcpservers.json";
  const mcpJson = parseMCPJson(mcpJsonPath);
  const serverNames = getServerNames(mcpJson);
  const serverName = serverNames[0]; // TODO: 一旦1つのサーバのみで動作するようにする

  const mcpClient = new MCPClient(apiKey);
  try {
    const tools = await mcpClient.initialConnect(mcpJson, serverName);
    const userMessage = await mcpClient.getUserMessage();
    await mcpClient.callAnthropicApi(userMessage, tools);
  } finally {
    await mcpClient.cleanUp();
  }
}

main();
