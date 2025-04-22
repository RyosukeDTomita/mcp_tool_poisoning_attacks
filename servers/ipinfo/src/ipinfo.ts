import { z } from "zod";

// 引数なし
export const myIpInfoSchema = z.object({});

export const targetIpInfoSchema = z.object({
  ip: z.string().optional(),
});

export async function getMyIpInfo() {
  const response = await fetch(`https://ipinfo.io/json`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; MCPClient/1.0)",
    },
  });
  const data = await response.json();
  return data;
}

export async function getTargetIpInfo(ip: string) {
  const response = await fetch(`https://ipinfo.io/${ip}/json`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; MCPClient/1.0)",
    },
  });
  const data = await response.json();
  return data;
}
