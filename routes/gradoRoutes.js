import express from 'express'; 
import { GradoController } from '../controllers/gradoController.js';

const router = express.Router(); 

router.get('/grado', GradoController.getAllGrado);
router.post("/grado", GradoController.createGrado);
router.post("/getGrado", GradoController.getGrado);
export default router