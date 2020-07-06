import { Router } from 'express';
import authToken from '../middlewares/authToken';
import User from '../models/user';
import Chat from '../models/chat';
import { ChatI, UserI } from '../@types';

const router = Router();

router.put('/avatar', authToken, async (req, res) => {
   try {
      const user = <UserI>await User.findByIdAndUpdate(
         res.locals.user._id,
         { $set: { ...req.body, new: false } },
         { new: true }
      );

      const chats = <ChatI[]>await Chat
         .find({ owner: res.locals.user._id })
         .populate({
            path: 'user',
            select: 'username avatar'
         })
         .populate('messages')
         .sort('-updatedAt');

      user.chats = chats;

      res.send({ user });
   }

   catch (error) {
      console.error(error);
      res.status(500);
   }
});

export default router;