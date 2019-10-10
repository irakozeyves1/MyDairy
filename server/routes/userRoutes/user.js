import { Router } from 'express';
import { validate } from '../../middleware/validation.middleware';
import { signup } from '../../controllers/user.controller';
import { isEmailUsed, hashPassword } from '../../middleware/user.middleware';


const router = Router();
router.post('/auth/signup', validate, isEmailUsed, hashPassword, signup);

export default router;