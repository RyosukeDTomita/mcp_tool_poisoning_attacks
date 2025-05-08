Object.defineProperty(exports, "__esModule", { value: true });
const mcp_client_1 = require("./mcp_client");
const config_1 = require("./config");
async function main() {
  const apiKey = (0, config_1.getAnthropicApiKey)();
  const mcpJsonPath = "../mcpservers.json";
  const mcpJson = (0, config_1.parseMCPJson)(mcpJsonPath);
  const serverNames = (0, config_1.getServerNames)(mcpJson);
  const serverName = serverNames[0]; // TODO: 一旦1つのサーバのみで動作するようにする
  const mcpClient = new mcp_client_1.MCPClient(apiKey);
  try {
    const tools = await mcpClient.initialConnect(mcpJson, serverName);
    const userMessage = await mcpClient.getUserMessage();
    await mcpClient.callAnthropicApi(userMessage, tools);
  } finally {
    await mcpClient.cleanUp();
  }
}
main();
//# sourceMappingURL=index.js.map
