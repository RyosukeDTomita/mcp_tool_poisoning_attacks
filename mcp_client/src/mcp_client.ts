import { Anthropic } from "@anthropic-ai/sdk";
import {
  MessageParam,
  Tool,
} from "@anthropic-ai/sdk/resources/messages/messages.mjs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";

export class MCPClient {
  private anthropic: Anthropic;
  private mcp: Client;

  constructor(ANTHROPIC_API_KEY: string) {
    this.anthropic = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
    this.mcp = new Client({ name: "mcp-client", version: "0.0.1" });
  }

  async runMCPServer(ServerRun) {

  }

}

