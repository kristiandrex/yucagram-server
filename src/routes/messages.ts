import { Router } from 'express'
import Message from '../models/message';

const router: Router = Router();

router.post('/', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();

        res.send(message);
    }

    catch (error) {
        console.error(error);
    }
});

export default router;