import { Router } from 'express';
import { validate } from '../../middleware/validation.middleware';
import { signup, signin } from '../../controllers/user.controller';
import { isEmailUsed, authanticate, hashPassword } from '../../middleware/user.middleware';


const router = Router();
router.post('/auth/signup', validate, isEmailUsed, hashPassword, signup);
router.post('/auth/signin', validate, authanticate, signin);
export default router;