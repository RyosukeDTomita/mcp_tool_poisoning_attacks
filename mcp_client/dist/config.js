Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnthropicApiKey = getAnthropicApiKey;
exports.parseMCPJson = parseMCPJson;
exports.getServiceNames = getServiceNames;
exports.createMcpServerCommand = createMcpServerCommand;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * Anthropic APIキーを環境変数から取得します
 *
 * @returns 設定されたAnthropic APIキー
 * @throws {Error} APIキーが環境変数に設定されていない場合
 */
function getAnthropicApiKey() {
    dotenv_1.default.config();
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error("Anthropic API key is not set in the environment variables.");
    }
    return apiKey;
}
/**
 * 指定されたパスからMCP設定用JSONファイルを読み込み、パースします
 *
 * @param mcpJsonPath - MCPサーバー設定ファイルへのパス
 * @returns パースされたJSONオブジェクト
 * @throws {Error} パスが空の場合
 * @throws {Error} ファイルの読み込みやパースに失敗した場合
 */
function parseMCPJson(mcpJsonPath) {
    if (!mcpJsonPath) {
        throw new Error("MCP JSON path is not set in the environment variables.");
    }
    try {
        const resolvedPath = path_1.default.resolve(__dirname, mcpJsonPath);
        const fileContents = fs_1.default.readFileSync(resolvedPath, "utf8");
        return JSON.parse(fileContents);
    }
    catch (error) {
        throw new Error(`Failed to parse MCP JSON file: ${error.message || "Unknown error"}`);
    }
}
/**
 * パースされたMCP JSONからサービス名のリストを取得します
 *
 * @param mcpJson - パースされたMCP JSON
 * @returns サービス名の配列
 */
function getServiceNames(mcpJson) {
    return Object.keys(mcpJson.mcpServers);
}
/**
 * 指定されたサービスに対応するMCPサーバーコマンドを生成します
 *
 * @param mcpJson - パースされたMCP JSON
 * @param serviceName - サービス名
 * @returns MCP サーバーを起動するコマンド
 * @throws {Error} 指定されたサービスが存在しない場合
 */
function createMcpServerCommand(mcpJson, serviceName) {
    const serverConfig = mcpJson.mcpServers[serviceName];
    if (!serverConfig) {
        throw new Error(`Unsupported service: ${serviceName}`);
    }
    // 環境変数部分の構築
    let envString = "";
    if (serverConfig.env) {
        envString = Object.entries(serverConfig.env)
            .map(([key, value]) => `${key}=${value}`)
            .join(" ");
        if (envString) {
            envString += " ";
        }
    }
    // コマンドと引数の構築
    const command = serverConfig.command;
    const args = serverConfig.args ? serverConfig.args.join(" ") : "";
    return `${envString}${command} ${args}`.trim();
}
//# sourceMappingURL=config.js.map
