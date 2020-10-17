import io from 'socket.io';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import Message from '../models/message';
import Chat from '../models/chat';
import User from '../models/user';

let socket: io.Server;

function connect(httpServer: Server) {
  socket = io(httpServer, { path: '/api/socket' });
  socket.on('connection', onConnect);

  return socket;
};

function onConnect(client: io.Socket) {
  const token = client.handshake.query.token;

  try {
    const _id: string = <string>jwt.verify(token, <string>process.env.SEED);
    client.join(_id);
  }

  catch (error) {
    console.error(error);
  }

  client.on('SEND_MESSAGE', onSendMessage);
  client.on('MESSAGE_SEEN', onMessageSeen);
}

async function onMessageSeen(_id: string) {
  try {
    const message = await Message.findByIdAndUpdate(_id, { seen: true }, { new: true, select: 'from to' });

    if (message !== null) {
      socket.to(message.from.toString()).emit('MESSAGE_SEEN', message);
    }
  }

  catch (error) {
    console.error(error);
  }
}

async function onSendMessage(data: any, response: Function) {
  try {
    const message = new Message(data);
    await message.save();

    await checkAndAddMessage(data.from, data.to, message);
    await checkAndAddMessage(data.to, data.from, message);

    response(message);
    socket.to(data.to).emit('SEND_MESSAGE', message);
  }

  catch (error) {
    console.error(error);
  }
}

async function checkAndAddMessage(owner: string, user: string, message: any) {
  let chat = await Chat.findOne({ owner, user });

  if (!chat) {
    chat = new Chat({ owner, user });
    await User.findByIdAndUpdate(owner, { $push: { chats: chat._id } });
  }

  chat.messages.push(message._id);

  if (message.to === owner) {
    chat.unread += 1;
  }

  await chat.save();
}

export default {
  connect
}