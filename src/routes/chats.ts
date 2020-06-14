import { Router } from 'express';
import Chat from '../models/chat';
import User from '../models/user';
import Room from '../models/room';
import authToken from '../middlewares/authToken';
import { ChatI } from '../@types';
import { Types } from 'mongoose';

const router = Router();

router.get('/', authToken, async (req, res) => {
  const chats = <ChatI[]>await Chat
    .find({ _id: res.locals.user.chats })
    .populate({
      path: 'user',
      select: 'username avatar'
    })
    .populate({
      path: 'room',
      populate: 'messages'
    });

  res.send(chats);
});

router.post('/', authToken, async (req, res) => {
  try {
    const users = [Types.ObjectId(res.locals.user._id), Types.ObjectId(req.body.user)];

    let room = await Room.findOne({ users: { $all: users } });

    let chat = await Chat
      .findOne({ room: room?._id, user: req.body.user })
      .populate('room')
      .populate({
        path: 'user',
        select: 'avatar username'
      });

    if (!room) {
      room = new Room({ users });
      await room.save();
    }

    if (!chat) {
      chat = new Chat({ user: req.body.user, room: room._id });
      await chat.save();

      await User.findByIdAndUpdate(res.locals.user._id, { $push: { chats: chat._id } });
      const user = await User.findById(req.body.user, 'avatar username');

      return res.send({ _id: chat._id, room, user });
    }

    res.send(chat);
  }

  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
