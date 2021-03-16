import io from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import Message from "@models/message";
import Chat from "@models/chat";
import { UserI } from "@types";

let instance: io.Server;

const origin = process.env.NODE_ENV === "production"
  ? "https://yucagram.vercel.app"
  : "http://localhost:3000";

const socketOptions = {
  cors: {
    origin,
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["token"],
  },
};

function connect(httpServer: http.Server): void {
  instance = new io.Server(httpServer, socketOptions);
  instance.use(middleware);
  instance.on("connection", listeners);
}

function middleware(socket: io.Socket, next: () => void) {
  const token = <string>socket.handshake.headers.token;

  try {
    const _id = <string>jwt.verify(token, <string>process.env.SEED);
    socket.join(_id);
    next();
  } catch (error) {
    console.error(error);
  }
}

function listeners(socket: io.Socket) {
  socket.on("READ_MESSAGE", async (_id, response) => {
    try {
      const message = await Message.findByIdAndUpdate(_id, { seen: true });

      if (message) {
        const from = await Chat.findOne({ from: message.from, to: message.to });

        const to = <UserI>await Chat.findOneAndUpdate(
          { from: message.to, to: message.from },
          { $inc: { unread: -1 } }
        );

        socket
          .to(<string>message.from.toString())
          .emit("READ_MESSAGE", { message, chatId: from?._id });

        response(to?._id);
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function getInstance(): io.Server {
  return instance;
}

export default {
  connect,
  getInstance,
};
