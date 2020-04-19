import { Router } from 'express';
import user from './user';
import login from './login';
import validate from './validate';
import upload from './upload';

const router = Router();

router.use('/users', user);
router.use('/login', login);
router.use('/validate', validate);
router.use('/upload', upload);

export default router;
