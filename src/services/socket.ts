import io from 'socket.io';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import Message from '../models/message';
import Chat from '../models/chat';
import User from '../models/user';
import { ChatI } from '../@types';

export default (httpServer: Server) => {
  const socket: io.Server = io(httpServer);

  socket.on('connection', (client: io.Socket) => {
    client.on('SIGNIN', (token: string) => {
      try {
        const _id: string = <string>jwt.verify(token, <string>process.env.SEED);
        client.join(_id);
      }

      catch (error) {
        console.error(error);
      }

    });

    client.on('SEND_MESSAGE', async (data, response) => {
      try {
        const message = new Message(data);
        await message.save();

        await Chat.findOneAndUpdate({ owner: data.from, user: data.to }, { $push: { messages: message._id } });

        let chat = <ChatI>await Chat.findOne({ owner: data.to, user: data.from });

        if (chat === null) {
          chat = new Chat({ owner: data.to, user: data.from });

          await User.findByIdAndUpdate(data.to, { $push: { chats: chat._id } });
        }

        chat.messages.push(message._id);
        chat.unread += 1;
        chat.save();

        client.to(data.to).emit('NEW_MESSAGE', message);

        response(message);
      } 
      
      catch (error) {
        console.error(error);
      }
    });

    client.on('OPEN_CHAT', async (_id) => {
      try {
        await Chat.findByIdAndUpdate(_id, { $set: { unread: 0 } });
      } 
      
      catch (error) {
        console.error(error);
      }
    });
  });

  return socket;
};