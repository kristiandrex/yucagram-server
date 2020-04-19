import { Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
  try {
    let body = req.body;

    const password = bcrypt.hashSync(body.password, 10);
    body.password = password;

    const user = new User(req.body);
    await user.save();
    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);

    res.send({ user, token });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }
});

router.post('/:username/avatar', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOneAndUpdate({ username }, req.body, { new: true });

    res.send(user);
  } catch (error) {
    res.send({ error });
  }
});

export default router;
