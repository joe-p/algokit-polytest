FROM oven/bun:1 AS base
COPY . .
RUN bun install
ENTRYPOINT ["bun", "bin/server.ts"]
