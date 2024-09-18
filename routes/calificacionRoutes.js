import { Router } from 'express';
const router = Router();
import { CalificacionController } from '../controllers/calificacionController.js';



router.get('/calificaciones', CalificacionController.getAllCalificacion);
router.get('/calificaciones/:id', CalificacionController.getAllCalificacionID);
router.post('/calificaciones', CalificacionController.createCalificacion);
router.put('/calificaciones/:id', CalificacionController.updateCalificacion);
router.delete('/calificaciones/:id', CalificacionController.deleteCalificacion);

export default router;
