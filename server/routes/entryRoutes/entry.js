/* eslint-disable eol-last */
import { Router } from 'express';
import { verifyToken } from '../../middleware/tokenMiddleware';
import { entry, update, remove, entryElement, getEntryById } from '../../controllers/addEntry';

const router = Router();
router.post('/entries', verifyToken, entry);
router.patch('/entries/:entryId', verifyToken, update);
router.delete('/entries/:entryId', verifyToken, remove);
router.get('/entries', verifyToken, entryElement);
router.get('/entries/:entryId', verifyToken, getEntryById);
export default router;