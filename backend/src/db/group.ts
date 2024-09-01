import { MongoClient, ObjectId } from "mongodb";

export type Group = {
  _id: ObjectId;
  groupName: string;
  imageURL: string;
};

export async function findGroups(MongoClient: MongoClient) {
  const servers = await MongoClient.db("3813ICT")
    .collection("servers")
    .find()
    .toArray();
  return servers;
}

export async function createGroup(MongoClient: MongoClient, group: Group) {
  return await MongoClient.db("3813ICT").collection("servers").insertOne(group);
}

export async function updateGroup(
  MongoClient: MongoClient,
  newServerDetails: Group
) {
  const { _id, ...details } = newServerDetails;
  return await MongoClient.db("3813ICT")
    .collection("servers")
    .replaceOne({ _id: new ObjectId(_id) }, details);
}
