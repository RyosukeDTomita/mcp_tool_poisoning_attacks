import { getAnthropicApiKey, parseMCPJson, getServiceNames, createMcpServerCommand } from "../src/config";

describe("getAnthropicApiKey", () => {
  test("getAnthropicApiKey returns API key when set", () => {
    const apiKey = getAnthropicApiKey();
    // .envからAPIキーが取得できていることを確認
    expect(apiKey).not.toBeNull();
  });
});

describe("parseMCPJson", () => {
  test("parseMCPJson returns parsed JSON when valid path is provided", () => {
    const mcpJsonPath = "../mcpservers.json";

    const mcpJson = parseMCPJson(mcpJsonPath);

    // MCP JSONが返されていることを確認
    expect(mcpJson).not.toBeNull();
  });

  test("parseMCPJson throws error when path is not set", () => {
    const emptyPath = "";
    expect(() => parseMCPJson(emptyPath)).toThrow();
  });
});

describe("create MCP Server Command", () => {
  test("createMCPServerCommand returns correct command", () => {
    const mcpJson = parseMCPJson("../mcpservers.json");
    const serviceNames = getServiceNames(mcpJson);
    for (const serviceName of serviceNames) {
      const command = createMcpServerCommand(mcpJson, serviceName);
      expect(command).toBeNull();
    }
  });
});