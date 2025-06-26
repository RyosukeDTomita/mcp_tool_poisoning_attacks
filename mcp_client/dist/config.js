'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnthropicApiKey = getAnthropicApiKey;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
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
//# sourceMappingURL=config.js.map
