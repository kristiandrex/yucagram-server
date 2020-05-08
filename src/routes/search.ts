import { Router } from 'express';
import User from '../models/user';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const value = req.body.value;
    const usernames = req.body.usernames;

    const users = await User
      .find({ username: { $regex: value, $nin: usernames } }, 'avatar username')
      .limit(5);

    res.send(users);
  }

  catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

export default router;