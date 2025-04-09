import { getAnthropicApiKey, parseMCPJson, getServiceNames, createMcpServerCommand } from "../src/config";

// モック用のMCP JSON
const mockMcpJson = {
  mcpServers: {
    github: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: "token"
      }
    },
    git: {
      command: "uv",
      args: [
        "--directory",
        "./servers/src/git",
        "run",
        "mcp-server-git"
      ]
    }
  }
};

describe("getAnthropicApiKey", () => {
  test("getAnthropicApiKey returns API key when set", () => {
    const apiKey = getAnthropicApiKey();
    expect(apiKey).not.toBeNull();
  });
});

describe("parseMCPJson", () => {
  test("parseMCPJson throws error when path is not set", () => {
    const emptyPath = "";
    expect(() => parseMCPJson(emptyPath)).toThrow();
  });
});

describe("getServiceNames", () => {
  test("getServiceNames returns array of service names", () => {
    const serviceNames = getServiceNames(mockMcpJson);
    expect(serviceNames).toEqual(["github", "git"]);
  });
});

describe("createMcpServerCommand", () => {
  test("createMcpServerCommand returns correct command for github service", () => {
    const serviceName = "github";
    const command = createMcpServerCommand(mockMcpJson, serviceName);
    
    const expectedCommand = "GITHUB_PERSONAL_ACCESS_TOKEN=token npx -y @modelcontextprotocol/server-github";
    expect(command).toBe(expectedCommand);
  });

  test("createMcpServerCommand returns correct command for git service", () => {
    const serviceName = "git";
    const command = createMcpServerCommand(mockMcpJson, serviceName);
    
    const expectedCommand = "uv --directory ./servers/src/git run mcp-server-git";
    expect(command).toBe(expectedCommand);
  });

  test("createMcpServerCommand throws error for unknown service", () => {
    const invalidServiceName = "invalid-service";
    
    expect(() => createMcpServerCommand(mockMcpJson, invalidServiceName)).toThrow(
      `Unsupported service: ${invalidServiceName}`
    );
  });
});