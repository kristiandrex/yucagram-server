import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User from '../models/user';
import { UserI, ChatI } from '../@types';
import Chat from '../models/chat';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = <UserI>await User
      .findOne({ username: req.body.username })
      .populate({
        path: 'chats',
        populate: {
          path: 'user',
          select: 'username avatar'
        }
      })
      .populate({
        path: 'chats',
        populate: {
          path: 'messages'
        }
      });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.sendStatus(400);
    }

    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);

    res.send({ user, token });
  }

  catch (error) {
    console.log(error);
    
    res.status(500).send('Intenta más tarde');
  }
});

router.get('/token', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded: string = <string>jwt.verify(<string>token, <string>process.env.SEED);
    const _id: Types.ObjectId = Types.ObjectId(decoded);

    const user = <UserI>await User.findById(_id);

    if (!user) {
      return res.sendStatus(400);
    }

    const chats = <ChatI[]>await Chat
      .find({ owner: _id })
      .populate({
        path: 'user',
        select: 'username avatar'
      })
      .populate('messages')
      .sort('-updatedAt');

    user.chats = chats;
    res.send(user);
  }

  catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

export default router;
