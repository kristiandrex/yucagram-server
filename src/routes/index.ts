import { Router } from 'express';
import signup from './signup';
import signin from './signin';
import upload from './upload';
import search from './search';
import chats from './chats';
import messages from './messages';

const router = Router();

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/upload', upload);
router.use('/search', search);
router.use('/chats', chats);
router.use('/messages', messages);

export default router;
