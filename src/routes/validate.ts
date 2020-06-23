import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.post('/username', async (req, res) => {
    const exists: boolean = await User.exists({ username: req.body.username });
    res.send(exists);
});

router.post('/email', async (req, res) => {
    const exists: boolean = await User.exists({ email: req.body.email });
    res.send(exists);
});

export default router;