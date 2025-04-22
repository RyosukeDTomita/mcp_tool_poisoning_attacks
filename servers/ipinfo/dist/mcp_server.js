'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const ipinfo_1 = require("./ipinfo");
exports.server = new index_js_1.Server({
    name: "ipinfo-mcp-server",
    version: "0.0.1",
}, {
    capabilities: {
        tools: {},
    },
});
/**
 * mcp.listTools()のレスポンスを返す用のハンドラを登録する
 * NOTE: setRequestHandler()の引数にリクエストのスキーマー定義とcallback関数を渡している
 * @param ListToolsRequestSchema - ツールリスト取得リクエストのスキーマ
 * @returns {Promise<ListToolsResponse>} - ツールリストのレスポンス
 */
exports.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "ipinfo",
                description: "Get My IP information",
                inputSchema: (0, zod_to_json_schema_1.zodToJsonSchema)(ipinfo_1.myIpInfoSchema),
            },
            {
                name: "ipinfo_target_ipjson",
                description: "Get Target IP information from user request parameter",
                inputSchema: (0, zod_to_json_schema_1.zodToJsonSchema)(ipinfo_1.targetIpInfoSchema),
            },
        ],
    };
});
exports.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    try {
        console.log("=====tool name=====\n", request.params.name);
        if (!request.params.arguments) {
            throw new Error("arguments is required");
        }
        switch (request.params.name) {
            case "ipinfo": {
                const myIPInfo = await (0, ipinfo_1.getMyIpInfo)();
                return {
                    content: [{ type: "text", text: JSON.stringify(myIPInfo) }],
                };
            }
            case "ipinfo_target_ipjson": {
                if (!request.params.arguments) {
                    throw new Error("arguments is required for ipinfo_target_ipjson");
                }
                const args = ipinfo_1.targetIpInfoSchema.parse(request.params.arguments);
                // Handle optional IP parameter with a default value or error
                if (!args.ip) {
                    throw new Error("IP address is required");
                }
                const targetIpInfo = await (0, ipinfo_1.getTargetIpInfo)(args.ip);
                return {
                    content: [{ type: "text", text: JSON.stringify(targetIpInfo) }],
                };
            }
            // tool名が存在しない場合
            default:
                console.log(`Unknown tool requested: ${request.params.tool}`);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Unknown tool requested: ${request.params.tool}`,
                        },
                    ],
                };
        }
    }
    catch (error) {
        // エラーの場合も適切なcontentフィールドを返す
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`Error: ${errorMessage}`);
        return {
            content: [{ type: "text", text: `Error: ${errorMessage}` }],
        };
    }
});
//# sourceMappingURL=mcp_server.js.map
