import io from 'socket.io';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import Message from '../models/message';
import Room from '../models/room';
import Chat from '../models/chat';

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

        await Room.findByIdAndUpdate(message.room, { $push: { messages: message._id } });
        await Chat.findOneAndUpdate({ room: data.room, user: data.from }, { $inc: { unread: 1 } });

        client.to(message.to.toString()).emit('NEW_MESSAGE', message);
        
        response(message);
      } catch (error) {
        console.error(error);
      }
    });

    client.on('OPEN_CHAT', async (_id) => {
      try {
        await Chat.findByIdAndUpdate(_id, { $set: { unread: 0 } });
      } catch (error) {
        console.error(error);
      }
    });
  });

  return socket;
};