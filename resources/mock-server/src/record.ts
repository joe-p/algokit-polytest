import { Algodv2, Indexer } from "algosdk";
import { record } from ".";
import { KmdClient } from "algosdk/client/kmd";

async function algosdkAlgodRequests() {
  const algod = new Algodv2("a".repeat(64), "http://localhost", 4001);
  await algod.status().do();
}

async function algosdkKmdRequests() {
  const kmd = new KmdClient("a".repeat(64), "http://localhost", 4002);
  await kmd.listWallets();
}

async function algosdkIndexerRequests() {
  const indexer = new Indexer("a".repeat(64), "http://localhost", 8980);
  await indexer.makeHealthCheck().do();
}

export async function recordAlgosdkRequests(
  client: "algod" | "kmd" | "indexer"
) {
  let makeRequests;

  if (client === "algod") {
    makeRequests = algosdkAlgodRequests;
  } else if (client === "kmd") {
    makeRequests = algosdkKmdRequests;
  } else if (client === "indexer") {
    makeRequests = algosdkIndexerRequests;
  } else {
    throw new Error(`Unknown client: ${client}`);
  }

  await record(client, makeRequests);
}
