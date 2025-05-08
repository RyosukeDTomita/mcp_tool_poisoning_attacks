import {
  getMcpParams,
  getMcpServerNames,
} from "../../src/client/mcp_settings_loader";
import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import { get } from "http";
import path from "path";

describe("getMcpServerNames", () => {
  test("mcpservers.jsonから取得したJSONからMCP Server名の配列を返すこと", () => {
    const serverNames = getMcpServerNames(
      path.resolve(__dirname, "../../mcpservers_example.json"),
    );
    expect(serverNames).toEqual(["ipinfo", "burp"]);
  });
});

describe("getMcpParams", () => {
  test("mcpservers.jsonからipinfoの接続パラメータを返すこと", () => {
    const serverName = "ipinfo";
    const params = getMcpParams(
      path.resolve(__dirname, "../../mcpservers_example.json"),
      serverName,
    );
    expect(params).toEqual({
      command: "/usr/local/bin/npx",
      args: [
        "-y",
        "github:RyosukeDTomita/mcp_tool_poisoning_attacks#main",
        "ipinfo",
      ],
      env: {
        PATH: "/usr/local/bin:/usr/bin:/bin",
      },
    });
  });
  test("mcpservers.jsonからburpの接続パラメータを返すこと", () => {
    const serverName = "burp";
    const params = getMcpParams(
      path.resolve(__dirname, "../../mcpservers_example.json"),
      serverName,
    );
    expect(params).toEqual("http://localhost:9876/sse");
  });
});
