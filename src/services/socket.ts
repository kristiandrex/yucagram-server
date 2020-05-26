import io from 'socket.io';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import Chat from '../models/chat';
import Room from '../models/room';
import User from '../models/user';
import Message from '../models/message';
import { UserI } from '../@types';

export default (httpServer: Server) => {
  const socket: io.Server = io(httpServer);

  socket.on('connection', (client: io.Socket) => {

    client.on('signin', (token: string) => {
      try {
        const _id: string = <string>jwt.verify(token, <string>process.env.SEED);
        client.join(_id);
      }

      catch (error) {
        console.error(error);
      }
    });

    client.on('addChat', async (data, response) => {
      try {
        const _id = jwt.verify(data.token, <string>process.env.SEED);

        const room = new Room();
        await room.save();

        const chat = new Chat({ user: data.userID, room: room._id });
        await chat.save();

        await User.findByIdAndUpdate(_id, { $push: { chats: chat._id } });
        const user = await User.findById(data.userID, 'avatar username');

        response({ _id: chat._id, room, user });
      }

      catch (error) {
        response(error)
      }

      client.emit('reloadChats');
    });


    client.on('sendMessage', async (data, response) => {
      try {
        const message = new Message(data.message);
        await message.save();

        await Room.findByIdAndUpdate(data.message.room, { $push: { messages: message._id } });

        const user: UserI = <UserI>await User
          .findById(data.message.to)
          .populate({
            path: 'chats',
            populate: 'room'
          });

        const exists = user?.chats.some(chat => chat.room._id.equals(data.message.room));

        if (!exists) {
          const chat = new Chat({ user: data.message.from, room: data.message.room });
          await chat.save();

          user.chats.push(chat._id);
          await user.save();
        }

        client.to(data.message.to).emit('sendMessage', data.message);
        response(message);
      }

      catch (error) {
        console.error(error);
      }
    });
  });

  return socket;
};