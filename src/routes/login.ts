import { Router } from 'express';
import User, { UserI } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = <UserI>await User.findOne({ username: req.body.username }, '-chats');

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(404).send('Usuario y/o contraseña incorrectos');
    }

    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Intenta más tarde');
  }
});

router.post('/token', async (req, res) => {
  try {
    const _id = <string>jwt.verify(req.body.token, <string>process.env.SEED);
    const user = <UserI>await User.findById(Types.ObjectId(<string>_id), '-chats');

    res.send(user);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

export default router;
