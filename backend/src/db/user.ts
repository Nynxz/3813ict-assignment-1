import { MongoClient } from "mongodb";

export enum Roles {
  "USER",
  "ADMIN",
  "SUPER",
  "NOBODY",
}

type Group = {
  name: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
  roles?: Roles[];
  groups?: Group[];
};

export async function createUser(
  MongoClient: MongoClient,
  user: Partial<User>
) {
  return await MongoClient.db("3813ICT").collection("users").insertOne(user);
}

export async function findUser(MongoClient: MongoClient, user: Partial<User>) {
  const foundUser = await MongoClient.db("3813ICT")
    .collection("users")
    .findOne({ $and: [{ email: user.email }, { password: user.password }] });
  return foundUser;
}
