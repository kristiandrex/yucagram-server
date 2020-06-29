import { Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;

    const salt = await bcrypt.genSalt();
    const password = bcrypt.hashSync(req.body.password, salt);

    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);

    res.send({ token, user });
  }

  catch (error) {
    res.status(400).send(error);
  }
});

export default router;
