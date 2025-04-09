import {
  getAnthropicApiKey,
  parseMCPJson,
  getServerNames,
  createMcpServerCommand,
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

describe("createMcpServerCommand", () => {
  test("githubのMCP Serverの名前をもとにgithubのコマンドが取得できること", () => {
    const serverName = "github";
    const command = createMcpServerCommand(mockMcpJson, serverName);

    const expectedCommand =
      "GITHUB_PERSONAL_ACCESS_TOKEN=token npx -y @modelcontextprotocol/server-github";
    expect(command).toBe(expectedCommand);
  });

  test("gitのMCP Serverの名前をもとにgitのコマンドが取得できること", () => {
    const serverName = "git";
    const command = createMcpServerCommand(mockMcpJson, serverName);

    const expectedCommand =
      "uv --directory ./servers/src/git run mcp-server-git";
    expect(command).toBe(expectedCommand);
  });

  test("mcpservers.jsonに定義されていないMCP Serverを指定した場合には例外をスロー", () => {
    const invalidServerName = "invalid-service";

    expect(() =>
      createMcpServerCommand(mockMcpJson, invalidServerName),
    ).toThrow();
  });
});
