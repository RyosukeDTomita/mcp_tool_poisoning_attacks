import {
  getAnthropicApiKey,
  parseMCPJson,
  getServerNames,
  getMcpParams,
} from "../src/config";

// モック用のMCP JSON
const mockMcpJson = {
  mcpServers: {
    github: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: "token",
      },
    },
    git: {
      command: "uv",
      args: ["--directory", "./servers/src/git", "run", "mcp-server-git"],
    },
  },
};

describe("getAnthropicApiKey", () => {
  test(".envからAPIキーが取得できていることを確認する", () => {
    const apiKey = getAnthropicApiKey();
    // NOTE: .envに格納されている値は環境依存のため，取得が成功していることのみを確認する。
    expect(apiKey).not.toBeNull();
  });
});

describe("parseMCPJson", () => {
  test("mcpservers.jsonをパースできた場合，値を返すこと", () => {
    const mcpJsonPath = "../mcpservers.json";
    expect(() => parseMCPJson(mcpJsonPath)).not.toBeNull();
  });

  test("mcpJSONのパスが不正な場合に，例外をスローする", () => {
    const emptyPath = "";
    expect(() => parseMCPJson(emptyPath)).toThrow();
  });
});

describe("getServerNames", () => {
  test("mcpservers.jsonから取得したJSONからMCP Server名の配列を返すこと", () => {
    const serverNames = getServerNames(mockMcpJson);
    expect(serverNames).toEqual(["github", "git"]);
  });
});

describe("getMCPCommand", () => {
  test("指定したサーバー名に対応するcommandを返すこと", () => {
    const command = getMcpParams(mockMcpJson, "github", "command");
    expect(command.command).toBe("npx");
  });
});

describe("getMCPArgs", () => {
  test("指定したサーバー名に対応するargsを返すこと", () => {
    const command = getMcpParams(mockMcpJson, "github", "args");
    expect(command.args).toEqual(["-y", "@modelcontextprotocol/server-github"]);
  });
});

describe("getMCPEnv", () => {
  test("指定したサーバー名に対応するenvを返すこと", () => {
    const command = getMcpParams(mockMcpJson, "github", "env");
    expect(command.env).toEqual({
      GITHUB_PERSONAL_ACCESS_TOKEN: "token",
    });
  });
});
