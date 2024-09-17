import express from "express";
import { AuthController } from "../controllers/authController.js";
import { isAuthenticated, isAdmin } from "../middlewares/middlewaresUser.js"

const router = express.Router();

router.get("/getUsers", AuthController.getAll);
router.get('/update/:id', AuthController.UpdatePage);
router.post("/getLogin", AuthController.login, isAuthenticated);
router.post("/getRegister", AuthController.register);
router.post("/getRegisterAdmin", AuthController.registerAdmin);
router.put("/update/:id", AuthController.updateAuth);
router.delete("/delete/:id", AuthController.deleteAuth)
router.get("/", AuthController.logout);

export default router;
