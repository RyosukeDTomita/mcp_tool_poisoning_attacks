# MCP Client

![un license](https://img.shields.io/github/license/RyosukeDTomita/mcp_tool_poisoning_attacks)

## INDEX

- [ABOUT](#about)
- [ENVIRONMENT](#environment)
- [PREPARING](#preparing)
- [HOW TO USE](#how-to-use)
- [EXAMPLE](#example)

---

## ABOUT

MCP Client

---

## ENVIRONMENT

- node.js v22
- [mcp sdk](https://github.com/modelcontextprotocol/typescript-sdk)
- `claude-3-5-haiku-20241022`

### Available Models

[List Models](https://docs.anthropic.com/en/api/models-list)

```shell
curl https://api.anthropic.com/v1/models \
    --header "x-api-key: $ANTHROPIC_API_KEY" \
    --header "anthropic-version: 2023-06-01"
{"data":[{"type":"model","id":"claude-3-7-sonnet-20250219","display_name":"Claude 3.7 Sonnet","created_at":"2025-02-24T00:00:00Z"},{"type":"model","id":"claude-3-5-sonnet-20241022","display_name":"Claude 3.5 Sonnet (New)","created_at":"2024-10-22T00:00:00Z"},{"type":"model","id":"claude-3-5-haiku-20241022","display_name":"Claude 3.5 Haiku","created_at":"2024-10-22T00:00:00Z"},{"type":"model","id":"claude-3-5-sonnet-20240620","display_name":"Claude 3.5 Sonnet (Old)","created_at":"2024-06-20T00:00:00Z"},{"type":"model","id":"claude-3-haiku-20240307","display_name":"Claude 3 Haiku","created_at":"2024-03-07T00:00:00Z"},{"type":"model","id":"claude-3-opus-20240229","display_name":"Claude 3 Opus","created_at":"2024-02-29T00:00:00Z"}],"has_more":false,"first_id":"claude-3-7-sonnet-20250219","last_id":"claude-3-opus-20240229"}
```

---

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

```shell
docker compose run mcp_client
GitHub MCP Server running on stdio
Tools:
 [
  {
    name: 'create_or_update_file',
    description: 'Create or update a single file in a GitHub repository',
    input_schema: {
      type: 'object',
      properties: [Object],
      required: [Array],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'create_issue',
    description: 'Create a new issue in a GitHub repository',
    input_schema: {
      type: 'object',
      properties: [Object],
      required: [Array],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
]
Enter your message: RyosukeDTomita/memoにhogeというタイトルのissueを立てて
I'll help you create an issue titled "hoge" in the RyosukeDTomita/memo repository. I'll use the `create_issue` function to do this.
[DEBUG] Attempting to create issue in RyosukeDTomita/memo
[DEBUG] Issue options: {
  "title": "hoge"
}
[DEBUG] Issue created successfully
=====MCP Server Tool result=====
: {
  content: [
    {
      type: 'text',
      text: '{\n' +
        '  "url": "https://api.github.com/repos/RyosukeDTomita/memo/issues/89",\n' +
        '  "repository_url": "https://api.github.com/repos/RyosukeDTomita/memo",\n' +
        '  "labels_url": "https://api.github.com/repos/RyosukeDTomita/memo/issues/89/labels{/name}",\n' +
        '  "comments_url": "https://api.github.com/repos/RyosukeDTomita/memo/issues/89/comments",\n' +
        '  "events_url": "https://api.github.com/repos/RyosukeDTomita/memo/issues/89/events",\n' +
        '  "html_url": "https://github.com/RyosukeDTomita/memo/issues/89",\n' +
        '  "id": 2990421567,\n' +
        '  "node_id": "I_kwDOI80-fc6yPjY_",\n' +
        '  "number": 89,\n' +
        '  "title": "hoge",\n' +
        '  "user": {\n' +
        '    "login": "RyosukeDTomita",\n' +
        '    "id": 50137312,\n' +
        '    "node_id": "MDQ6VXNlcjUwMTM3MzEy",\n' +
        '    "avatar_url": "https://avatars.githubusercontent.com/u/50137312?v=4",\n' +
        '    "gravatar_id": "",\n' +
        '    "url": "https://api.github.com/users/RyosukeDTomita",\n' +
        '    "html_url": "https://github.com/RyosukeDTomita",\n' +
        '    "followers_url": "https://api.github.com/users/RyosukeDTomita/followers",\n' +
        '    "following_url": "https://api.github.com/users/RyosukeDTomita/following{/other_user}",\n' +
        '    "gists_url": "https://api.github.com/users/RyosukeDTomita/gists{/gist_id}",\n' +
        '    "starred_url": "https://api.github.com/users/RyosukeDTomita/starred{/owner}{/repo}",\n' +
        '    "subscriptions_url": "https://api.github.com/users/RyosukeDTomita/subscriptions",\n' +
        '    "organizations_url": "https://api.github.com/users/RyosukeDTomita/orgs",\n' +
        '    "repos_url": "https://api.github.com/users/RyosukeDTomita/repos",\n' +
        '    "events_url": "https://api.github.com/users/RyosukeDTomita/events{/privacy}",\n' +
        '    "received_events_url": "https://api.github.com/users/RyosukeDTomita/received_events",\n' +
        '    "type": "User",\n' +
        '    "user_view_type": "public",\n' +
        '    "site_admin": false\n' +
        '  },\n' +
        '  "labels": [],\n' +
        '  "state": "open",\n' +
        '  "locked": false,\n' +
        '  "assignee": null,\n' +
        '  "assignees": [],\n' +
        '  "milestone": null,\n' +
        '  "comments": 0,\n' +
        '  "created_at": "2025-04-12T11:31:41Z",\n' +
        '  "updated_at": "2025-04-12T11:31:41Z",\n' +
        '  "closed_at": null,\n' +
        '  "author_association": "OWNER",\n' +
        '  "sub_issues_summary": {\n' +
        '    "total": 0,\n' +
        '    "completed": 0,\n' +
        '    "percent_completed": 0\n' +
        '  },\n' +
        '  "active_lock_reason": null,\n' +
        '  "body": null,\n' +
        '  "closed_by": null,\n' +
        '  "reactions": {\n' +
        '    "url": "https://api.github.com/repos/RyosukeDTomita/memo/issues/89/reactions",\n' +
        '    "total_count": 0,\n' +
        '    "+1": 0,\n' +
        '    "-1": 0,\n' +
        '    "laugh": 0,\n' +
        '    "hooray": 0,\n' +
        '    "confused": 0,\n' +
        '    "heart": 0,\n' +
        '    "rocket": 0,\n' +
        '    "eyes": 0\n' +
        '  },\n' +
        '  "timeline_url": "https://api.github.com/repos/RyosukeDTomita/memo/issues/89/timeline",\n' +
        '  "performed_via_github_app": null,\n' +
        '  "state_reason": null\n' +
        '}'
    }
  ]
}
=====Response from Anthropic API after tool use=====
 上記のレスポンスは、GitHub API を使用して RyosukeDTomita/memo リポジトリに "hoge" というタイトルの Issue (Issue #89) を作成した結果を示しています。

主な情報は以下の通りです：

- Issue 番号: 89
- タイトル: "hoge"
- 作成者: RyosukeDTomita
- 状態: open
- 作成日時: 2025-04-12T11:31:41Z

特に注目すべき点：
- ラベルは設定されていない
- 担当者は割り当てられていない
- コメントはまだない
- 本文（body）は null

このレスポンスは、GitHub API を通じて Issue が正常に作成されたことを示しています。
```
