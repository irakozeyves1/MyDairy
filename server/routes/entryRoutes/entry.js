/* eslint-disable eol-last */
import { Router } from 'express';
import { verifyToken } from '../../middleware/token.middleware';
import { entry } from '../../controllers/Entry/addentry';

const router = Router();
router.post('/entries', verifyToken, entry);

export default router;