import { MCPClient } from "../src/mcp_client";

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

// describe("getTools", () => {
//   test("MCP Serverからツールリストが取得できることを確認する", () => {
//     // TODO: 実装する
//     // const tools = getTools();
//     // expect(tools).not.toBeNull();
//     expect(true).toBe(true); // 暫定対応
//   });
// });
