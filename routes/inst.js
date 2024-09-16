import express from 'express';
import { InstController } from '../controllers/instController.js';

const router = express.Router();

router.get('/admin', InstController.AdminPage);
router.post('/institucion', InstController.createInst);
router.put('/institucion/:id', InstController.updateInst);
router.delete('/institucion/:id', InstController.deleteInst);

export default router;
