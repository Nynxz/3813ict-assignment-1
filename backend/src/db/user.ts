import { MongoClient, ObjectId } from "mongodb";

import mongoose, { Schema } from "mongoose";

export enum Roles {
  "USER",
  "ADMIN",
  "SUPER",
  "NOBODY",
}

let UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  roles: Array<Roles>,
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

export const UserModel = mongoose.model("User", UserSchema);

type Group = {
  name: string;
};

export type User = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  roles?: Roles[];
  groups?: ObjectId[];
};

export async function createUser(user: Partial<User>) {
  const exists = await UserModel.exists({ username: user.username });
  if (!exists) {
    let nn = new UserModel(user);
    let newUser = await nn.save();
    // let n = await MongoClient.db("3813ICT").collection("users").insertOne(user);
    console.log(newUser.toObject());
    return newUser.toObject();
  }
}

export async function findUser(user: Partial<User>) {
  const foundUser = await UserModel.findOne({
    username: user.username,
    password: user.password,
  }).exec();
  return foundUser?.toObject();
}

export async function getAllUsers() {
  return await UserModel.find();
  // const foundUser = await MongoClient.db("3813ICT")
  //   .collection("users")
  //   .findOne({
  //     $and: [{ username: user.username }, { password: user.password }],
  //   });
  // return foundUser;
}

export async function updateUser(user: Partial<User>) {
  return await UserModel.updateOne({ _id: user._id }, user);
}
