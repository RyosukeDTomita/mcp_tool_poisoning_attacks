FROM mcr.microsoft.com/devcontainers/typescript-node:22-bookworm AS devcontainers
WORKDIR app
COPY ./package.json yarn.lock .
RUN yarn install

FROM devcontainers AS compile
COPY . .
#RUN yarn run test
RUN <<EOF bash -ex
yarn run package
yarn remove $(jq -r '.devDependencies | keys | join(" ")' package.json)
EOF

FROM node:22-slim AS deploy
RUN <<EOF bash -ex
apt-get update -y
apt-get install -y --no-install-recommends git ca-certificates
EOF
COPY --from=compile /app/dist/ /app/dist/
COPY --from=compile /app/node_modules/ /app/node_modules/
COPY ./mcpservers.json /app/
ENTRYPOINT ["node", "/app/dist/index.js"]
