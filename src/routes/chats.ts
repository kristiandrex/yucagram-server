import { Router } from 'express';
import Chat from '../models/chat';
import User from '../models/user';
import authToken from '../middlewares/authToken';
import { UserI, ChatI } from '../@types';

const router = Router();

router.get('/', authToken, async (req, res) => {
  const chats = <ChatI[]>await Chat
    .find({ _id: res.locals.user.chats })
    .populate({
      path: 'user',
      select: 'username avatar'
    })
    .populate('messages');

  res.send(chats);
});

router.get('/:owner/:user', authToken, async (req, res) => {
  const chat = <ChatI>await Chat
    .findOne({ owner: req.params.owner, user: req.params.user as any })
    .populate({
      path: 'user',
      select: 'username avatar'
    })
    .populate('messages');

  res.send(chat);
});

router.post('/', authToken, async (req, res) => {
  try {
    let chat = await Chat
      .findOne({ user: req.body.user, owner: res.locals.user._id })
      .populate({
        path: 'user',
        select: 'avatar username'
      });

    if (chat === null) {
      const user = <UserI>await User.findById(req.body.user, 'avatar username');

      chat = new Chat({ user: req.body.user, owner: res.locals.user._id });
      chat.user = user;

      await chat.save();
    }

    await User.findByIdAndUpdate(res.locals.user._id, { $push: { chats: chat?._id } });
    res.send(chat);
  }

  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete('/:_id', authToken, async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params._id);
    res.sendStatus(200);
  }

  catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
});

export default router;