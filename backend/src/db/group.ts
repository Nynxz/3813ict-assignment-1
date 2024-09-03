import { MongoClient, ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { UserModel } from "./user";

let GroupSchema = new Schema({
  name: String,
  imageURL: String,
  channels: [
    {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
  ],
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
export const GroupModel = mongoose.model("Group", GroupSchema);

export type Group = {
  _id: ObjectId;
  name: string;
};

export async function findGroups(jwt: any) {
  console.log(jwt);
  if (jwt.roles.includes(2)) {
    return await GroupModel.find();
  } else {
    let user = await UserModel.findById(jwt._id).populate("groups");
    let groups = await GroupModel.find({
      admins: [new ObjectId(jwt._id as string)],
    });
    console.log(groups);
    return [...user!.groups, ...groups];
  }
}

export async function createGroup(user: any, group: Group) {
  console.log(user);
  // create group
  let newGroup = await new GroupModel(group).save();
  newGroup.admins.push(new ObjectId(user as string));
  await newGroup.save();
  return newGroup;
}

export async function updateGroup(newServerDetails: Group) {
  const { _id, ...details } = newServerDetails;
  return await GroupModel.findOneAndUpdate({ _id }, details);
  // return await MongoClient.db("3813ICT")
  //   .collection("servers")
  //   .replaceOne({ _id: new ObjectId(_id) }, details);
}

export async function getUsersOfGroup(groupId: string) {
  let group = await GroupModel.findById(groupId);
  console.log(group);
  let b = await UserModel.find({ groups: new ObjectId(group?._id) }).exec();
  console.log(b);
  return b;
  // return await MongoClient.db("3813ICT")
  //   .collection("servers")
  //   .replaceOne({ _id: new ObjectId(_id) }, details);
}

export async function getGroup(
  MongoClient: MongoClient,
  newServerDetails: Group
) {
  const { _id, ...details } = newServerDetails;
  return await MongoClient.db("3813ICT")
    .collection("servers")
    .replaceOne({ _id: new ObjectId(_id) }, details);
}
