import io from "socket.io";
import { Server } from "http";
import jwt from "jsonwebtoken";
import Message from "@models/message";
import Chat from "@models/chat";
import User from "@models/user";
import { MessageI, UserI } from "@types";

let socket: io.Server;

function init(httpServer: Server): io.Server {
  socket = io(httpServer);
  socket.on("connection", connect);

  return socket;
}

function connect(client: io.Socket) {
  const token = client.handshake.query.token;

  try {
    const _id: string = <string>jwt.verify(token, <string>process.env.SEED);
    client.join(_id);
  }

  catch (error) {
    console.error(error);
  }

  client.on("SEND_MESSAGE", sendMessage);
  client.on("READ_MESSAGE", readMessage);
}

async function sendMessage(payload: MessageI, response: (message: MessageI) => void) {
  try {
    const message = new Message(payload);
    await message.save();

    await Chat.findOneAndUpdate({ from: payload.from, to: payload.to }, { $push: { messages: message._id } });
    let chat = await Chat.findOne({ from: payload.to, to: payload.from });

    if (!chat) {
      chat = new Chat({ from: payload.to, to: payload.from });
      await User.findByIdAndUpdate(payload.to, { $push: { chats: chat._id } });
    }

    chat.messages.push(message._id);
    chat.unread += 1;

    await chat.save();

    socket.to(<string>payload.to).emit("SEND_MESSAGE", { message, chat: chat._id });
    response(message);
  }

  catch (error) {
    console.log(error);
    response(error);
  }
}

async function readMessage(_id: string, response: (message: string) => void) {
  try {
    const message = await Message.findByIdAndUpdate(_id, { seen: true });

    if (message) {
      const from = await Chat.findOne({ from: message.from, to: message.to });

      const to = <UserI>await Chat.findOneAndUpdate(
        { from: message.to, to: message.from },
        { $inc: { unread: -1 } }
      );

      response(to?._id);
      socket.to(<string>message.from).emit("READ_MESSAGE", { message, chat: from?._id });
    }
  }

  catch (error) {
    console.log(error);
  }
}

export default {
  init
};