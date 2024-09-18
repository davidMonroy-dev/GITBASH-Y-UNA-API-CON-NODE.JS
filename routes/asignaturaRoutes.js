import { Router } from 'express';
const router = Router();
import { AsignaturaController } from '../controllers/asignaturaController.js';

router.get('/asignatura', AsignaturaController.getAllAsignaturas);
router.get('/asignatura/:id', AsignaturaController.getAllAsignaturasID);
router.post('/asignatura', AsignaturaController.createAsignatura);
router.put('/asignatura/:id', AsignaturaController.updateAsignatura);
router.delete('/asignatura/:id', AsignaturaController.deleteAsignatura);




export default router;
