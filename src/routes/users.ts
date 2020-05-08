import { Router, RequestHandler } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authToken from '../middlewares/authToken';

const router = Router();

router.use('/:username', <RequestHandler>authToken);

router.post('/', async (req, res) => {
  try {
    let body = req.body;

    const salt = await bcrypt.genSalt();
    const password = bcrypt.hashSync(body.password, salt);
    
    body.password = password;

    const user = new User(req.body);
    await user.save();
    const token = jwt.sign(user._id.toString(), <string>process.env.SEED);

    res.send({ user, token });
  } catch (error) {
    res.send(error);
  }
});

export default router;
