import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();
// POST REQUESTS --->
router.post("/register", authController.register__POST);
router.post("/login", authController.login__POST);

// GET REQUESTS --->
router.get("/register", authController.register__GET);

export default router;
