import { Types } from "mongoose";
import Chat from "../models/chat";
import User from "../models/user";
import { ChatI, UserI } from "../@types";

/**
 * @param from ID from user owner of the chat
 * @param to ID from the other user of the chat
 */
async function create(from: Types.ObjectId, to: Types.ObjectId): Promise<ChatI | null> {
  try {
    let chat = await Chat.findOne({ to, from });

    if (chat) {
      return chat;
    }

    chat = new Chat({ to, from });
    chat.save();

    await User.findByIdAndUpdate(from, { $push: { chats: chat._id } });

    const user = <UserI>await User.findById(to, "avatar username");
    chat.to = user;

    return chat;
  }

  catch (error) {
    console.log(error);
    return null;
  }
}

export default {
  create
}