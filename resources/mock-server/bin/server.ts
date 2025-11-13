import type { Client } from "../src/index.ts";
import { startServer } from "../src/server.ts";

const client = process.argv[2];
const mode = process.argv[3];
const server = await startServer(
  client as Client,
  mode as "record-new" | "record-overwrite" | "replay"
);

await server.listen;
