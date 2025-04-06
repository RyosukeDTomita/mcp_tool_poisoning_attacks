FROM mcr.microsoft.com/devcontainers/base:bookworm AS devcontainers
WORKDIR /app
# install deno
RUN curl -fsSL https://deno.land/install.sh | sudo DENO_INSTALL=/usr/local sh


FROM devcontainers AS compile
COPY . .
WORKDIR <your-repository> # FIXME
RUN deno compile --allow-net --allow-env --allow-read --output main main.ts


FROM gcr.io/distroless/cc-debian12:latest AS run
COPY --from=compile /app/<your-repository>/main /app/main # FIXME
ENTRYPOINT ["/app/main"]
