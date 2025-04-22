# ipinfo mcp server

![un license](https://img.shields.io/github/license/RyosukeDTomita/mcp_tool_poisoning_attacks)

## INDEX

- [ABOUT](#about)
- [ENVIRONMENT](#environment)
- [PREPARING](#preparing)
- [HOW TO USE](#how-to-use)

---

## ABOUT

MCP Serverをとりあえず作ってみた。

---

## ENVIRONMENT

- node.js v22
- [mcp sdk](https://github.com/modelcontextprotocol/typescript-sdk)

---

## PREPARING

```shell
cd /app/servers/ipinfo
yarn run install
yarn run bundle
```

```shell
# 動作テスト
node /app/servers/ipinfo/dist/index.js
ipinfo-mcp-server is running...
```

---

## HOW TO USE

> [!NOTE]
> 自作した [../../mcp_client](../../mcp_client/)を使って実行した例

```shell
# 8.8.8.8について調査した実行例
node /app/mcp_client/dist/index.js
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
Enter your message: 8.8.8.8について調査して
=====Request to Anthoropic API=====
 [ { role: 'user', content: '8.8.8.8について調査して' } ]
=====Response from Anthropic API=====:
 {
  id: 'msg_01BXHTJy8VQUTH9woGMZCuAp',
  type: 'message',
  role: 'assistant',
  model: 'claude-3-5-haiku-20241022',
  content: [
    {
      type: 'text',
      text: '8.8.8.8 の情報を調査します。IPアドレス情報を取得するために、ipinfo_target_ipjsonツールを使用します。'
    },
    {
      type: 'tool_use',
      id: 'toolu_01T3jLWsHTKpfvTwbeP7TyuQ',
      name: 'ipinfo_target_ipjson',
      input: [Object]
    }
  ],
  stop_reason: 'tool_use',
  stop_sequence: null,
  usage: {
    input_tokens: 429,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 110
  }
}
8.8.8.8 の情報を調査します。IPアドレス情報を取得するために、ipinfo_target_ipjsonツールを使用します。
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
 8.8.8.8は、Googleが提供する公開DNSサーバーのIPアドレスです。詳細は以下の通りです：

1. 基本情報
- IP: 8.8.8.8
- ホスト名: dns.google
- 所在地: アメリカ、カリフォルニア州マウンテンビュー
- 組織: Google LLC
- 緯度経度: 38.0088, -122.1175
- タイムゾーン: America/Los_Angeles

2. 特徴
- 無料の公共DNS解決サービス
- 高速で信頼性が高い
- IPv4アドレス
- エニーキャスト（Anycast）対応

3. 利点
- 高速なインターネット接続
- セキュリティ保護
- 地理的に分散された複数のサーバー
- フィルタリング機能

4. 使用方法
- ネットワーク設定で簡単に利用可能
- デフォルトDNSサーバーの代替として使用

多くのユーザーやネットワーク管理者に広く利用されています。
```

```shell
# 自分のIPアドレスについて調査した実行例
node /app/mcp_client/dist/index.js
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
Enter your message: 今使用しているipアドレスを調べて
=====Request to Anthoropic API=====
 [ { role: 'user', content: '今使用しているipアドレスを調べて' } ]
=====Response from Anthropic API=====:
 {
  id: 'msg_017D5aqNi7EsX9Vgyvfcf8oQ',
  type: 'message',
  role: 'assistant',
  model: 'claude-3-5-haiku-20241022',
  content: [
    { type: 'text', text: '私は、`ipinfo`関数を使用して、現在のIPアドレス情報を取得します。' },
    {
      type: 'tool_use',
      id: 'toolu_012TRduy9nLgAahdVoZrFq4P',
      name: 'ipinfo',
      input: {}
    }
  ],
  stop_reason: 'tool_use',
  stop_sequence: null,
  usage: {
    input_tokens: 432,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 66
  }
}
私は、`ipinfo`関数を使用して、現在のIPアドレス情報を取得します。
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
 あなたの現在のIPアドレスは8.8.8.8であることがわかります。
```

---
