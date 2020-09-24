import { Router } from 'express';
import signup from './signup';
import signin from './signin';
import validate from './validate';
import auth from './auth';

const router = Router();

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/validate', validate);
router.use('/auth', auth);

export default router;
