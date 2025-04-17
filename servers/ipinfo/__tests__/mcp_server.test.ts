import { server } from "../src/mcp_server";
// ignore the IDE warning about type checking
import { describe, test, expect } from "@jest/globals";

describe("MCP Server", () => {
  test("serverインスタンスが正しく作成されること", () => {
    expect(server).toBeDefined();
  });
});
