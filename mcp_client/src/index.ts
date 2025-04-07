import dotenv from "dotenv";
import { MCPClient } from "./mcp_client";

function getAnthropicApiKey() {
  dotenv.config();
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
