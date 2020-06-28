import { Router } from 'express';
import signup from './signup';
import signin from './signin';
import search from './search';
import chats from './chats';
import messages from './messages';
import validate from './validate';

const router = Router();

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/search', search);
router.use('/chats', chats);
router.use('/messages', messages);
router.use('/validate', validate);

export default router;
