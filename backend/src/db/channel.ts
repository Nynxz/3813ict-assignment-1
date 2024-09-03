import mongoose, { Schema } from "mongoose";

let ChannelSchema = new Schema({
  name: String,
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },
});
export const ChannelModel = mongoose.model("Channel", ChannelSchema);

export async function createChannel(channel: object) {
  let newChannel = new ChannelModel(channel);
  let savedChannel = await newChannel.save();
  return savedChannel;
  // return await MongoClient.db("3813ICT")
  //   .collection("channels")
  //   .insertOne(channel);
}
export async function updateChannel(channel: any) {
  let c = await ChannelModel.updateOne({ _id: channel._id }, channel);
  return c;
  // return await MongoClient.db("3813ICT")
  //   .collection("channels")
  //   .insertOne(channel);
}

export async function deleteChannel(channel: { _id: string }) {
  return await ChannelModel.deleteOne({ _id: channel._id });
}

export async function getChannelsForGroup(group: string) {
  return await ChannelModel.find({ group }).exec();
}
