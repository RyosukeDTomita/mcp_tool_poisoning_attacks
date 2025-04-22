'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.targetIpInfoSchema = exports.myIpInfoSchema = void 0;
exports.getMyIpInfo = getMyIpInfo;
exports.getTargetIpInfo = getTargetIpInfo;
const zod_1 = require("zod");
// 引数なし
exports.myIpInfoSchema = zod_1.z.object({});
exports.targetIpInfoSchema = zod_1.z.object({
    ip: zod_1.z.string().optional(),
});
async function getMyIpInfo() {
    const response = await fetch(`https://ipinfo.io/json`, {
        headers: {
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; MCPClient/1.0)",
        },
    });
    const data = await response.json();
    return data;
}
async function getTargetIpInfo(ip) {
    const response = await fetch(`https://ipinfo.io/${ip}/json`, {
        headers: {
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; MCPClient/1.0)",
        },
    });
    const data = await response.json();
    return data;
}
//# sourceMappingURL=ipinfo.js.map
