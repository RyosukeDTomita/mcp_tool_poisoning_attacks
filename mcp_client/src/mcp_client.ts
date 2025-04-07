import { Anthoropic } from "@anthropic-ai/sdk";
import {
  MessageParam,
  Tool,
} from "@anthropic-ai/sdk/resources/messages/messages.mjs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";

class MCPClient {
  constructor(ANTHROPIC_API_KEY: string) {
    this.anthropic = new Anthoropic({
      apiKey: ANTHOROPIC_API_KEY,
    });
  }
}
