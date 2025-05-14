[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/ryosukedtomita-mcp-tool-poisoning-attacks-badge.png)](https://mseep.ai/app/ryosukedtomita-mcp-tool-poisoning-attacks)

# MCP_TOOL_POISONING_ATTACKS

![un license](https://img.shields.io/github/license/RyosukeDTomita/mcp_tool_poisoning_attacks)

## INDEX

- [ABOUT](#about)
- [ENVIRONMENT](#environment)
- [PREPARING](#preparing)
- [HOW TO USE](#how-to-use)
- [EXAMPLE](#example)

---

## ABOUT

MCP Client and MCP Server

---

## ENVIRONMENT

- node.js v22
- [mcp sdk](https://github.com/modelcontextprotocol/typescript-sdk)
- `claude-3-5-haiku-20241022`

> [!NOTE]
> [./servers/ipinfo/](./servers/ipinfo/)は現在`npx`を使ってMCP Clientから使用する形を取っている。
> npxを使ってGitHubのリポジトリからinstallするには`package.json`をリポジトリトップに配置する必要があるため，npx使用のための[./package.json](./package.json)をリポジトリトップに配置している。

---

## PREPARING

### For Dev Container

1. install VSCode, Docker
2. install VSCode Extensions *Dev ContainerS*
3. On the VSCode, `Ctrl shift p` and run `Dev Containers: Rebuild Containers`
4. create `.env` and add `ANTHROPIC_API_KEY`

  ```shell
  cat << EOF > mcp_client/.env
  ANTHROPIC_API_KEY=your_anthropic_api_key
  EOF
  ```

5. create `mcp_client/mcpservers.json`

### Docker

1. create `.env` and add `ANTHROPIC_API_KEY`

  ```shell
  cat << EOF > mcp_client/.env
  ANTHROPIC_API_KEY=your_anthropic_api_key
  EOF
  ```

2. create `mcp_client/mcpservers.json`
3. build docker image

  ```shell
  docker compose build
  ```

---

## HOW TO USE

### Running in Dev Containers

```shell
cd mcp_client
yarn run bundle
node dist/index.js
```

### Running to docker run

```shell
docker compose run -it mcp_client
```

---

## EXAMPLE

example of `mcp_client/mcpservers.json`

```json
{
  "mcpServers": {
    "github": {
      "command": "/usr/local/bin/npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "github_pat_hogehoge",
        "PATH": "/usr/local/bin:/usr/bin:/bin"
      }
    },
    "git": {
      "command": "uv",
      "args": [
        "--directory",
        "/<path to mcp-servers>/mcp-servers/src/git",
        "run",
        "mcp-server-git"
      ]
    }
  }
}
```

> [!NOTE]
> 現状は`mcpservers.json`の中にある一番上のサーバを使用するようになっている。

```shell
docker compose run -it mcp_client
Tools:
 [
  {
    name: 'ipinfo',
    description: 'Get My IP information',
    input_schema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'ipinfo_target_ipjson',
    description: 'Get Target IP information from user request parameter',
    input_schema: {
      type: 'object',
      properties: [Object],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  }
]
Enter your message: 8.8.8.8の情報を教えて
=====Request to Anthoropic API=====
 [ { role: 'user', content: '8.8.8.8の情報を教えて' } ]
=====Response from Anthropic API=====:
 {
  id: 'msg_012ZGLAfhWKmgDroHELiq6F6',
  type: 'message',
  role: 'assistant',
  model: 'claude-3-5-haiku-20241022',
  content: [
    {
      type: 'text',
      text: '8.8.8.8の情報を調べるために、ipinfo_target_ipjsonツールを使用します。'
    },
    {
      type: 'tool_use',
      id: 'toolu_01EecHroNi48aFhzTaW5V5NW',
      name: 'ipinfo_target_ipjson',
      input: [Object]
    }
  ],
  stop_reason: 'tool_use',
  stop_sequence: null,
  usage: {
    input_tokens: 432,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 97
  }
}
8.8.8.8の情報を調べるために、ipinfo_target_ipjsonツールを使用します。
=====MCP Server Tool result=====
: {
  content: [
    {
      type: 'text',
      text: '{"ip":"8.8.8.8","hostname":"dns.google","city":"Mountain View","region":"California","country":"US","loc":"38.0088,-122.1175","org":"AS15169 Google LLC","postal":"94043","timezone":"America/Los_Angeles","readme":"https://ipinfo.io/missingauth","anycast":true}'
    }
  ]
}
=====Response from Anthropic API after tool use=====
 この情報は、IPアドレス8.8.8.8の詳細を示しています。主な特徴は以下の通りです：

1. IP: 8.8.8.8
2. ホスト名: dns.google
3. 所在地:
   - 都市: Mountain View
   - 地域: カリフォルニア
   - 国: アメリカ合衆国（US）
4. 地理的座標: 北緯38.0088、西経-122.1175
5. 組織: AS15169 Google LLC
6. 郵便番号: 94043
7. タイムゾーン: アメリカ/ロサンゼルス
8. エニーキャスト: はい（true）

この8.8.8.8は、Googleが提供する公開DNSサーバーの1つで、一般的に多くのユーザーが利用している信頼性の高いDNSサービスです。
```

## References

- [My MCPClient Readme](./mcp_client/README.md)
- [My MCPServer(ipinfo) Readme](./servers/ipinfo/README.md)
