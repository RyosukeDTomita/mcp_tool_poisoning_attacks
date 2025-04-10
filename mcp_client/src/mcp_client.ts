// import { Anthropic } from "@anthropic-ai/sdk";
// import {
//   MessageParam,
//   Tool,
// } from "@anthropic-ai/sdk/resources/messages/messages.mjs";
// import { Client } from "@modelcontextprotocol/sdk/client/index.js";
// import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
// import readline from "readline/promises";

/**
 * MCP（Model Context Protocol）クライアントクラス
 *
 * AnthropicのAPIと連携し、MCPサーバーとのインターフェースを提供します
 */
export class MCPClient {
  // private anthropic: Anthropic;
  // private mcp: Client;

  /**
   * MCPClientのコンストラクタ
   *
   * @param ANTHROPIC_API_KEY - Anthropic APIの認証キー
   * @throws Error - ANTHROPIC_API_KEYが指定されていない場合
   */
  constructor(ANTHROPIC_API_KEY: string) {
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is required");
    }

    // this.anthropic = new Anthropic({
    //   apiKey: ANTHROPIC_API_KEY,
    // });
    // this.mcp = new Client({ name: "mcp-client", version: "0.0.1" });
  }
}
