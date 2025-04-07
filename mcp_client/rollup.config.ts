// See: https://rollupjs.org/introduction/

import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { glob } from "glob";

const config = {
  input: glob.sync("src/**/*.ts"),
  output: {
    esModule: true,
    dir: "dist",
    format: "es",
    sourcemap: true,
  },
  plugins: [typescript(), nodeResolve(), commonjs()],
};

export default config;
