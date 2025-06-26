// ignore the IDE warning about type checking
import { describe, test, expect, jest } from "@jest/globals";

import path from "path";

import { MCPClient } from "../../src/client/mcp_client";
import { getAnthropicApiKey } from "../../src/config";

describe("MCPClient.session()", () => {
  test("MCPClientを使用してみる", async () => {
    const apiKey = getAnthropicApiKey();
    const userMessage = "8.8.8.8の情報を教えて";
    const mcpJsonPath = path.resolve(
      __dirname,
      "../../mcpservers_example.json",
    );

    await MCPClient.session(async (mcpClient: MCPClient) => {
      await mcpClient.execute(apiKey, mcpJsonPath, userMessage);
    });
  });
});
