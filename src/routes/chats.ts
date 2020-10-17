import { Router } from 'express';
import Chat from '../models/chat';
import User from '../models/user';
import { UserI } from '../@types';

const router = Router();

router.get('/', async (_req, res) => {
  const chats = await Chat
    .find({ owner: res.locals.user })
    .populate({ path: 'user', select: 'username avatar' })
    .populate('messages');

  res.send(chats);
});

router.post('/', async (req, res) => {
  try {
    let chat = await Chat
      .findOne({ user: req.body.user, owner: res.locals.user })
      .populate({ path: 'user', select: 'avatar username' })
      .populate({ path: 'messages' });

    if (chat === null) {
      const user = <UserI>await User.findById(req.body.user, 'avatar username');

      chat = new Chat({ user: req.body.user, owner: res.locals.user });
      chat.user = user;
      await chat.save();
    }

    await User.findByIdAndUpdate(res.locals.user, { $push: { chats: chat._id } });
    res.send(chat);
  }

  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete('/:_id', async (req, res) => {
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