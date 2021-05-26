import { Server, Socket } from "socket.io";
import http from "http";
import Message from "@models/message";
import Chat from "@models/chat";
import User from "@models/user";
import authSocket from "@middlewares/authSocket";
import { clientUrl } from "@config";
import { MessageI } from "@types";

let instance: Server;

const socketOptions = {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["token"]
  }
};

function connect(httpServer: http.Server): void {
  instance = new Server(httpServer, socketOptions);
  instance.use(authSocket);

  instance.on("connection", (client) => {
    client.on("SEND_MESSAGE", handleSendMessage);
    client.on("READ_MESSAGE", handleReadMessage);
  });
}

async function handleReadMessage(
  this: Socket,
  _id: string,
  callback: (_id?: string) => void
) {
  try {
    const message = await Message.findByIdAndUpdate(_id, { seen: true });

    if (!message) {
      return;
    }

    const chatFrom = await Chat.findOne({ from: message.from, to: message.to });
    const chatTo = await Chat.findOneAndUpdate(
      { from: message.to, to: message.from },
      { $inc: { unread: -1 } }
    );

    this.to(message.from.toString()).emit("READ_MESSAGE", {
      message,
      chat: chatFrom?._id
    });

    callback(chatTo?._id);
  } catch (error) {
    console.error(error);
  }
}

async function handleSendMessage(
  this: Socket,
  payload: MessageI,
  callback: (message: MessageI) => void
) {
  try {
    const message = new Message(payload);
    await message.save();
    const { _id } = message;

    await Chat.findOneAndUpdate(
      { from: payload.from, to: payload.to },
      { $push: { messages: _id } }
    );

    let chatTo = await Chat.findOneAndUpdate(
      { from: payload.to, to: payload.from },
      { $push: { messages: _id }, $inc: { unread: 1 } }
    );

    if (!chatTo) {
      chatTo = new Chat({
        from: payload.to,
        to: payload.from,
        unread: 1,
        messages: [_id]
      });

      await chatTo.save();
      await User.findByIdAndUpdate(payload.to, {
        $push: { chats: chatTo._id }
      });
    }

    this.to(payload.to.toString()).emit("SEND_MESSAGE", {
      message,
      chatId: chatTo._id
    });

    callback(message);
  } catch (error) {
    console.log(error);
  }
}

export default {
  connect
};
