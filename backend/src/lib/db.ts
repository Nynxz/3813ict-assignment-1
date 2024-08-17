import { MongoClient } from "mongodb";

export async function findServers(MongoClient: MongoClient) {
  const servers = await MongoClient.db("3813ICT")
    .collection("servers")
    .find()
    .toArray();
  return servers;
}

export async function createServer(
  MongoClient: MongoClient,
  serverName: String
) {
  return await MongoClient.db("3813ICT")
    .collection("servers")
    .insertOne({ serverName });
}
