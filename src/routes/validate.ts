import { Router } from 'express';
const router = Router();
import User from '../models/user';

router.post('/username', async (req, res) => {
  const exists = await User.exists({ username: req.body.username });
  res.send(exists);
});

router.post('/email', async (req, res) => {
  const exists = await User.exists({ email: req.body.email });
  res.send(exists);
});

export default router;