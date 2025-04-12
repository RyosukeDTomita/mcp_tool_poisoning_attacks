Object.defineProperty(exports, "__esModule", { value: true });
const mcp_client_1 = require("./mcp_client");
const config_1 = require("./config");
async function main() {
    const apiKey = (0, config_1.getAnthropicApiKey)();
    const mcpJsonPath = "../mcpservers.json";
    const mcpJson = (0, config_1.parseMCPJson)(mcpJsonPath);
    const serverNames = (0, config_1.getServerNames)(mcpJson);
    const serverName = serverNames[0]; // TODO: 一旦1つのサーバのみで動作するようにする
    const mcpClient = new mcp_client_1.MCPClient(apiKey);
    await mcpClient.initialConnect(mcpJson, serverName);
    await mcpClient.callAnthropicApi("RyosukeDTomita/memoにhogeというissueを作成して");
    // ユーザからの入力をを受け取る
    // ユーザからのメッセージ + toolの情報を含んだリクエストを作成し，Anthropic APIを叩く
    // レスポンスから使用可能なツールを選択し，ツールを使用する。使用可能なツールがない場合は，Anthropic APIのレスポンスをそのまま返す
}
main();
//# sourceMappingURL=index.js.map
