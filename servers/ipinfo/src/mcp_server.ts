import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  myIpInfoSchema,
  targetIpInfoSchema,
  getMyIpInfo,
  getTargetIpInfo,
} from "./ipinfo";

/**
 * MCPツール情報の型定義
 */
interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

/**
 * ListTools リクエストのレスポンス型定義
 */
interface ListToolsResponse {
  tools: MCPTool[];
  _meta?: { [key: string]: unknown };
  nextCursor?: string;
}

export const server = new Server(
  {
    name: "ipinfo-mcp-server",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

/**
 * mcp.listTools()のレスポンスを返す用のハンドラを登録する
 * NOTE: setRequestHandler()の引数にリクエストのスキーマー定義とcallback関数を渡している
 * @param ListToolsRequestSchema - ツールリスト取得リクエストのスキーマ
 * @returns {Promise<ListToolsResponse>} - ツールリストのレスポンス
 */
server.setRequestHandler(
  ListToolsRequestSchema,
  async (): Promise<ListToolsResponse> => {
    return {
      tools: [
        {
          name: "ipinfo",
          description: "Get My IP information",
          inputSchema: zodToJsonSchema(myIpInfoSchema),
        },
        {
          name: "ipinfo_target_ipjson",
          description: "Get Target IP information from user request parameter",
          inputSchema: zodToJsonSchema(targetIpInfoSchema),
        },
      ],
    };
  },
);

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    console.log("=====tool name=====\n", request.params.name);
    if (!request.params.arguments) {
      throw new Error("arguments is required");
    }

    switch (request.params.name) {
      case "ipinfo": {
        const myIPInfo = await getMyIpInfo();
        return {
          content: [{ type: "text", text: JSON.stringify(myIPInfo) }],
        };
      }
      case "ipinfo_target_ipjson": {
        if (!request.params.arguments) {
          throw new Error("arguments is required for ipinfo_target_ipjson");
        }
        const args = targetIpInfoSchema.parse(request.params.arguments);
        // Handle optional IP parameter with a default value or error
        if (!args.ip) {
          throw new Error("IP address is required");
        }
        const targetIpInfo = await getTargetIpInfo(args.ip);
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
  } catch (error: unknown) {
    // エラーの場合も適切なcontentフィールドを返す
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.log(`Error: ${errorMessage}`);
    return {
      content: [{ type: "text", text: `Error: ${errorMessage}` }],
    };
  }
});
