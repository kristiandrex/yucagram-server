import { Router } from 'express';
import users from './users';
import signin from './signin';
import validate from './validate';
import upload from './upload';
import search from './search';
import chats from './chats';

const router = Router();

router.use('/users', users);
router.use('/signin', signin);
router.use('/validate', validate);
router.use('/upload', upload);
router.use('/search', search);
router.use('/chats', chats);

export default router;
