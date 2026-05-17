import express from "express";
import { verifyEmail, register, login } from "../controllers/authController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ROTA DE CADASTRO
|--------------------------------------------------------------------------
*/

router.post("/login", login);
router.post("/register", register);
router.post("/verify-email", verifyEmail);

export default router;
