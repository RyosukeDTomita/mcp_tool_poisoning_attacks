import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  // 複数のエントリポイントを指定
  input: ["src/index.ts", "src/mcp_server.ts", "src/ipinfo.ts"],
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true,
  },
  external: [
    "@modelcontextprotocol/sdk",
    "zod",
    "zod-to-json-schema",
    "node-fetch",
  ],
  plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
});
