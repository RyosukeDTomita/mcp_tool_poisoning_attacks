FROM mcr.microsoft.com/devcontainers/typescript-node:22-bookworm AS devcontainers
WORKDIR app
COPY ./package.json yarn.lock .
RUN yarn install

FROM devcontainers AS compile
COPY . .
WORKDIR /app/mcp_client
RUN yarn run bundle

FROM gcr.io/distroless/nodejs22-debian12 AS deploy
COPY --from=compile /app/dist/index.js .
ENTRYPOINT ["nodejs/bin/node", "/app/dist/index.js"]
