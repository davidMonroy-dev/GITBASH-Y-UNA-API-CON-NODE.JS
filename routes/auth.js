import express from "express";
import { AuthController } from "../controllers/authController.js"

const router = express.Router();

router.get("/getUsers", AuthController.getAll);
router.post("/getLogin", AuthController.login);
router.post("/getRegister", AuthController.register);
router.put("/getUpdate/:id", AuthController.updateAuth);
router.get("/", AuthController.logout);

export default router;
