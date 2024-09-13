import express from "express";
import { AuthController } from "../controllers/authController.js"

const router = express.Router();

router.get("/getUsers", AuthController.getAll);
router.post("/getLogin", AuthController.login);
router.post("/getRegister", AuthController.register);
router.get("/", AuthController.logout);

// obtener los id de cada rol
router.get("/getProfesor", AuthController.getProfesor)
router.get("/getAdmin", AuthController.getAdmin)
router.get("/getEstudiante", AuthController.getEstudiante)

export default router;