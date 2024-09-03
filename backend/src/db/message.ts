import mongoose, { Schema } from "mongoose";

let MessageSchema = new Schema({
  from: String,
  content: String,
  channel: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const MessageModel = mongoose.model("Message", MessageSchema);

export const sendMessage = async (
  message: string,
  channel: string,
  from: string
) => {
  let newMessage = new MessageModel({
    content: message,
    channel: channel,
    sender: from,
  });
  return await newMessage.save();
};

export async function getMessagesForChannel(channel: string) {
  return await MessageModel.find({ channel }).exec();
}
