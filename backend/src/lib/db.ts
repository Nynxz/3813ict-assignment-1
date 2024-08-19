import { Condition, MongoClient, ObjectId } from "mongodb";

export type Server = {
  _id: ObjectId;
  serverName: string;
  imageURL: string;
};

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

export async function updateServer(
  MongoClient: MongoClient,
  newServerDetails: Server
) {
  const { _id, ...details } = newServerDetails;
  return await MongoClient.db("3813ICT")
    .collection("servers")
    .replaceOne({ _id: new ObjectId(_id) }, details);
}
