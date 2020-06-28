import { Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
  try {
    let body = req.body;

    const salt = await bcrypt.genSalt();
    const password = bcrypt.hashSync(body.password, salt);

    body.password = password;

    const user = new User(req.body);
    await user.save();
    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);

    res.send({ token, user });
  }

  catch (error) {
    res.status(400).send(error);
  }
});

export default router;
