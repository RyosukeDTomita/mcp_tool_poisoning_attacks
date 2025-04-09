MCP Serverのリソースを置くディレクトリ。

e.g. [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

以下の様に，npx等を使う場合にはリソースは不要

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```
