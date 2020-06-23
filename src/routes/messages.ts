import { Router } from 'express'
import Message from '../models/message';
import authToken from '../middlewares/authToken';

const router: Router = Router();

router.post('/', authToken, async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();

    res.send(message);
  } catch (error) {
    console.error(error);
  }
});

export default router;