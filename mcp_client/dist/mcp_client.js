Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPClient = void 0;
const tslib_1 = require("tslib");
const sdk_1 = require("@anthropic-ai/sdk");
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
const promises_1 = tslib_1.__importDefault(require("readline/promises"));
const config_1 = require("./config");
/**
 * MCP（Model Context Protocol）クライアントクラス
 */
class MCPClient {
    anthropic;
    mcp;
    transport; // definite assignment assertion
    tools = [];
    /**
     * MCPClientのコンストラクタ
     *
     * @param ANTHROPIC_API_KEY - Anthropic APIの認証キー
     * @throws Error - ANTHROPIC_API_KEYが指定されていない場合
     */
    constructor(ANTHROPIC_API_KEY) {
        if (!ANTHROPIC_API_KEY) {
            throw new Error("ANTHROPIC_API_KEY is required");
        }
        this.anthropic = new sdk_1.Anthropic({
            apiKey: ANTHROPIC_API_KEY,
        });
        this.mcp = new index_js_1.Client({ name: "mcp-client", version: "0.0.1" });
    }
    /**
     * MCPサーバーに接続し，ツールリストを取得する
     * @param mcpJson - MCPサーバー設定ファイルをパースしたJSON
     * @param serverName - サーバー名
     * @returns Tool[] - ツールのリスト
     */
    async initialConnect(mcpJson, serverName) {
        const command = (0, config_1.getMcpParams)(mcpJson, serverName, "command").command;
        if (!command) {
            throw new Error(`Command for server ${serverName} is not defined`);
        }
        const args = (0, config_1.getMcpParams)(mcpJson, serverName, "args").args || [];
        const env = (0, config_1.getMcpParams)(mcpJson, serverName, "env").env || {};
        // MCPサーバーに接続する
        this.transport = new stdio_js_1.StdioClientTransport({
            command: command,
            args: args,
            env: env,
        });
        try {
            await this.mcp.connect(this.transport);
            const toolsResult = await this.mcp.listTools();
            this.tools = toolsResult.tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    input_schema: tool.inputSchema,
                };
            });
        }
        catch (error) {
            console.error("Failed to connect to MCP server:", error);
            throw error;
        }
        console.log("Tools:\n", this.tools);
    }
    /**
     * ユーザからのメッセージを取得する
     * @returns ユーザのメッセージ
     */
    async getUserMessage() {
        const rl = promises_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const userMessage = await rl.question("Enter your message: ");
        rl.close();
        return userMessage;
    }
    /**
     * Anthropic APIを叩いてユーザのメッセージをもとに適切なツールを選択する。
     * 適切なツールがない場合は、Anthropic APIのレスポンスをそのまま返す
     * @param userMessage
     */
    async callAnthropicApi(userMessage) {
        const messages = [
            {
                role: "user",
                content: userMessage,
            },
        ];
        // console.log("=====Request to Anthoropic API=====\n", messages);
        // ユーザの入力をもとにどのツールを使うべきかを決定するためにAnthropic APIを叩く
        const response = await this.anthropic.messages.create({
            model: "claude-3-5-haiku-20241022",
            max_tokens: 1000,
            messages,
            tools: this.tools,
        });
        // console.log("=====Response from Anthropic API=====:\n", response);
        for (const content of response.content) {
            if (content.type === "text") {
                console.log(content.text);
                continue;
            }
            if (content.type === "tool_use") {
                const toolName = content.name;
                const toolArgs = content.input;
                // MCP Serverのツールを実行する
                const toolResult = await this.mcp.callTool({
                    name: toolName,
                    arguments: toolArgs,
                });
                console.log("=====MCP Server Tool result=====\n:", toolResult);
                messages.push({
                    role: "user",
                    content: toolResult.content,
                });
                const toolResultFeedBack = await this.anthropic.messages.create({
                    model: "claude-3-5-haiku-20241022",
                    max_tokens: 1000,
                    messages,
                });
                // textのレスポンスなら内容を出力，tool_use等之レスポンスならno text responseを出力する
                console.log("=====Response from Anthropic API after tool use=====\n", toolResultFeedBack.content[0].type === "text"
                    ? toolResultFeedBack.content[0].text
                    : "not text response");
            }
        }
    }
    /**
     * MCPClientのクリーンアップ処理
     */
    async cleanUp() {
        await this.mcp.close();
    }
}
exports.MCPClient = MCPClient;
//# sourceMappingURL=mcp_client.js.map
