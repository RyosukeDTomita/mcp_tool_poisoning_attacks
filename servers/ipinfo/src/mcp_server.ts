import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import fetch, { Request, Response } from "node-fetch";

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
          inputSchema: zodToJsonSchema(
            z.object({
              ip: z.string().optional(),
            }),
          ),
        },
        {
          name: "ipinfo/target_ip/json",
          description: "Get Target IP information from user request parameter",
          inputSchema: zodToJsonSchema(
            z.object({
              ip: z.string().optional(),
            }),
          ),
        },
      ],
    };
  },
);
