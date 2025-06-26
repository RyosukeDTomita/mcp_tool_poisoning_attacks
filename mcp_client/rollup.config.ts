// See: https://rollupjs.org/introduction/

import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { glob } from "glob";

const config = {
  input: glob.sync("src/**/*.ts"),
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  external: [
    "@anthropic-ai/sdk",
    "@modelcontextprotocol/sdk/client/index.js",
    "@modelcontextprotocol/sdk/client/stdio.js",
    "dotenv",
    "fs",
    "path",
    "readline/promises",
  ],
  plugins: [typescript(), nodeResolve({ preferBuiltins: true }), commonjs()],
};

export default config;
