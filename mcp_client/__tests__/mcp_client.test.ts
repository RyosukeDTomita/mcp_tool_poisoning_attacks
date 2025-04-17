// ignore the IDE warning about type checking
import { describe, test, expect } from "@jest/globals";

import { MCPClient } from "../src/mcp_client";

// モック用のMCP JSON
const mockMcpJson = {
  mcpServers: {
    github: {
      command: "/usr/local/bin/npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: "token",
        PATH: "/usr/local/bin:/usr/bin:/bin"
      },
    },
    git: {
      command: "uv",
      args: ["--directory", "./servers/src/git", "run", "mcp-server-git"],
    },
  },
};

describe("MCPClient", () => {
  test("MCPClientのインスタンスが正しく作成されること", () => {
    const apiKey = "test_api_key";
    const mcpClient = new MCPClient(apiKey);
    expect(mcpClient).toBeInstanceOf(MCPClient);
  });

  test("APIキーが指定されていない場合にエラーがスローされること", () => {
    expect(() => new MCPClient("")).toThrow("ANTHROPIC_API_KEY is required");
  });
});

describe("initialConnect", () => {
  test("MCPサーバーに接続し，ツールリストを取得する", async () => {
    const apiKey = "test_api_key";
    const mcpClient = new MCPClient(apiKey);
    await mcpClient.initialConnect(mockMcpJson, "github");
    expect(mcpClient.getTools()).toBeDefined();
  });
});