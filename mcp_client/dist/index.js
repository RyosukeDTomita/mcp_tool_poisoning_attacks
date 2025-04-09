Object.defineProperty(exports, "__esModule", { value: true });
const mcp_client_1 = require("./mcp_client");
const config_1 = require("./config");
async function main() {
    const apiKey = (0, config_1.getAnthropicApiKey)();
    const mcpJsonPath = "../mcpservers.json";
    const mcpJson = (0, config_1.parseMCPJson)(mcpJsonPath);
    console.log(`-----servicename=${Object.keys(mcpJson.mcpServers)[0]}-----`);
    new mcp_client_1.MCPClient(apiKey);
    // MCP Serverの起動
    // ユーザからの入力をAnthropic APIに送信
    // MCP Serverへのリクエストに使うJSON?を作成
    // MCP Serverにリクエストを送信する。
    // MCP Serverからのレスポンスを受け取る
    // TODO: 処理に失敗した場合とかループしたほうが良さそうだけど，めんどいので一旦これで
}
main();
//# sourceMappingURL=index.js.map
