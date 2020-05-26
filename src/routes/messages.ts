import { Router } from 'express'
import Room from '../models/room';
import Message from '../models/message';
import authToken from '../middlewares/authToken';

const router: Router = Router();

router.post('/', authToken, async (req, res) => {
  const message = new Message(req.body.message);
  await message.save();

  await Room.findByIdAndUpdate(message.room, { $push: { messages: message._id } });

  res.send(message);
});

export default router;