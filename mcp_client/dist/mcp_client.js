Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPClient = void 0;
const sdk_1 = require("@anthropic-ai/sdk");
class MCPClient {
  anthropic;
  client;
  constructor(ANTHROPIC_API_KEY) {
    this.anthropic = new sdk_1.Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
  }
}
exports.MCPClient = MCPClient;
//# sourceMappingURL=mcp_client.js.map
