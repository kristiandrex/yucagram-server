import { Router } from 'express';
import Chat from '../models/chat';
import User from '../models/user';
import Room from '../models/room';
import authToken from '../middlewares/authToken';

const router = Router();

router.get('/', (req, res) => {
  res.send(res.locals.user.chats);
});

router.post('/', authToken, async (req, res) => {
  try {
    const room = new Room();
    await room.save();

    const chat = new Chat({ user: req.body.user, room: room._id });
    await chat.save();

    await User.findByIdAndUpdate(res.locals.user._id, { $push: { chats: chat._id } });
    const user = await User.findById(req.body.user, 'avatar username');

    res.send({ _id: chat._id, room, user });    
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
