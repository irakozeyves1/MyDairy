/* eslint-disable eol-last */
import { Router } from 'express';
import { verifyToken } from '../../middleware/token.middleware';
import { entry, update, remove } from '../../controllers/Entry/addentry';

const router = Router();
router.post('/entries', verifyToken, entry);
router.patch('/entries/:entryId', verifyToken, update);
router.delete('/entries/:entryId', verifyToken, remove);

export default router;