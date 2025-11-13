import type { Client } from "../src/index.ts";
import { startServer } from "../src/server.ts";

const client = process.argv[2];
const server = await startServer(client as Client);

await server.listen;
