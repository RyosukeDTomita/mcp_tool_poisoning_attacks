FROM mcr.microsoft.com/devcontainers/typescript-node:22-bookworm AS devcontainers
WORKDIR app
COPY ./package.json yarn.lock .
RUN yarn install

COPY . .

# FROM gcr.io/distroless/cc-debian12:latest AS run
# COPY --from=compile /app/mcp_client/main /app/main
# ENTRYPOINT ["/app/main"]
