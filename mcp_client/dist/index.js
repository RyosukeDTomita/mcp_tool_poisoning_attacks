Object.defineProperty(exports, "__esModule", { value: true });
const mcp_client_1 = require("./mcp_client");
const config_1 = require("./config");
async function main() {
    const apiKey = (0, config_1.getAnthropicApiKey)();
    const mcpJsonPath = "../mcpservers.json";
    const mcpJson = (0, config_1.parseMCPJson)(mcpJsonPath);
    const serverNames = (0, config_1.getServerNames)(mcpJson);
    serverNames[0]; // TODO: 一旦1つのサーバのみで動作するようにする
    new mcp_client_1.MCPClient(apiKey);
    // MCP Serverに接続し，利用可能なツールの一覧を取得する
    // ユーザからの入力をを受け取る
    // ユーザからのメッセージ + toolの情報を含んだリクエストを作成し，Anthropic APIを叩く
    // レスポンスから使用可能なツールを選択し，ツールを使用する。使用可能なツールがない場合は，Anthropic APIのレスポンスをそのまま返す
}
main();
//# sourceMappingURL=index.js.map
