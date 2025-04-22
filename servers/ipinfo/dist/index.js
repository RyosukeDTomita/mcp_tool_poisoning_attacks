#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
// npxで呼び出せるように作成する
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const mcp_server_js_1 = require("./mcp_server.js");
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await mcp_server_js_1.server.connect(transport);
    console.log("ipinfo-mcp-server is running...");
}
main().catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map
