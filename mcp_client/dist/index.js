Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
function getAnthropicApiKey() {
  dotenv_1.default.config();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Anthropic API key is not set in the environment variables.",
    );
  }
  return apiKey;
}
async function main() {
  const apiKey = getAnthropicApiKey();
  console.log(apiKey);
  // const mcpClient = new MCPClient(process.env.ANTHROPIC_API_KEY!);
}
main();
//# sourceMappingURL=index.js.map
