import { Request, Response } from "express";
import Message from "@models/message";
import Chat from "@models/chat";
import User from "@models/user";
import socket from "@util/socket";

async function createMessage(req: Request, res: Response): Promise<void> {
  try {
    const { body } = req;
    const message = new Message(body);
    await message.save();

    //update chat from which message is sent
    await Chat.findOneAndUpdate(
      { from: body.from, to: body.to },
      { $push: { messages: message._id } }
    );

    //find chat that receives the message
    let chat = await Chat.findOne({ from: body.to, to: body.from });

    if (!chat) {
      chat = new Chat({ from: body.to, to: body.from });
      await User.findByIdAndUpdate(body.to, { $push: { chats: chat._id } });
    }

    chat.messages.push(message._id);
    chat.unread += 1;
    await chat.save();

    socket
      .getInstance()
      .to(<string>body.to)
      .emit("SEND_MESSAGE", { message, chatId: chat._id });

    res.send(message);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export default {
  createMessage
};
