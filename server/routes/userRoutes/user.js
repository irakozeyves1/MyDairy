import { Router } from 'express';
import { validate } from '../../middleware/validationMiddleware';
import { signup, signin } from '../../controllers/userController';
import { isEmailUsed, authanticate, hashPassword } from '../../middleware/userMiddleware';

const router = Router();
router.post('/auth/signup', validate, isEmailUsed, hashPassword, signup);
router.post('/auth/signin', validate, authanticate, signin);
export default router;
