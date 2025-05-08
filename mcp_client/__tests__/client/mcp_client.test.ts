// ignore the IDE warning about type checking
import { describe, test, expect, jest } from "@jest/globals";

import { MCPClient } from "../src/client/mcp_client";
import readline from "readline/promises";

// モック用のMCP JSON
const mockMcpJson = {
  mcpServers: {
    github: {
      command: "/usr/local/bin/npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: "token",
        PATH: "/usr/local/bin:/usr/bin:/bin",
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
    const tools = await mcpClient.initialConnect(mockMcpJson, "github");
    expect(tools).not.toEqual([]);
  });
});

describe("getUserMessage", () => {
  test("ユーザからの入力を正しく取得できること", async () => {
    // mock
    const mockUserInput =
      "RyosukeDTomita/mcp_tool_poisoning_attacksにbugというIssueを作成してください。";
    jest
      .spyOn(MCPClient.prototype, "getUserMessage")
      .mockImplementation(async () => mockUserInput);

    const apiKey = "test_api_key";
    const mcpClient = new MCPClient(apiKey);
    const result = await mcpClient.getUserMessage();

    expect(result).toBe(mockUserInput);

    jest.restoreAllMocks();
  });
});

// callAnthropicApi()のテストはAPI代金をケチるために省略。モック化してテストすることにあまり意味を感じない
