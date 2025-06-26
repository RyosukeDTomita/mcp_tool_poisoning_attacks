'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mcp_client_1 = require("./client/mcp_client");
const mcp_settings_loader_1 = require("./client/mcp_settings_loader");
const config_1 = require("./config");
const promises_1 = tslib_1.__importDefault(require("readline/promises"));
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * ユーザからのメッセージを取得する
 * @returns ユーザのメッセージ
 */
async function getUserMessage() {
    const rl = promises_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const userMessage = await rl.question("Enter your message: ");
    rl.close();
    return userMessage;
}
async function main() {
    const apiKey = (0, config_1.getAnthropicApiKey)();
    const mcpJsonPath = path_1.default.resolve(__dirname, "../mcpservers.json");
    const serverNames = (0, mcp_settings_loader_1.getMcpServerNames)(mcpJsonPath);
    const serverName = serverNames[0]; // TODO: 一旦，1つのサーバのみで動作するようにする
    const userMessage = await getUserMessage();
    await mcp_client_1.MCPClient.session(async (mcpClient) => {
        await mcpClient.execute(apiKey, mcpJsonPath, userMessage, serverName);
        // ログを出力
        const logs = mcpClient.getLogs();
        console.log("\n===== Execution Log =====");
        logs.forEach((log) => console.log(log));
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=index.js.map
