import { Router } from 'express';
import { check } from 'express-validator';

/**Routes */
import signup from '../controllers/signup';
import signin from '../controllers/signin';
import auth from './auth';

/**Middlewares */
import validate from '../middlewares/validate';

const router = Router();

router.use('/signup', [
    check('username', 'Este campo es obligatorio').notEmpty(),
    check('email', 'Este campo es obligatorio').isEmail(),
    check('password', 'Este campo es obligatorio').notEmpty(),
    validate
], signup);

router.use('/signin', [
    check('username', 'Este campo es obligatorio').notEmpty(),
    check('password', 'Este campo es obligatorio').notEmpty(),
    validate
], signin);

router.use('/auth', auth);

export default router;
