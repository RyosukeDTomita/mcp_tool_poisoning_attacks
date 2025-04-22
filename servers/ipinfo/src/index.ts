#!/usr/bin/env node
// npxで呼び出せるように作成する
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./mcp_server.js";

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("ipinfo-mcp-server is running...");
}

main().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
