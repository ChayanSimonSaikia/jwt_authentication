import { Router } from "express";
import authController from "../controllers/auth.controller";
import { verify_token } from "../utils/init_token";

const router = Router();
// POST REQUESTS --->
router.post("/register", authController.register__POST);
router.post("/login", authController.login__POST);

// GET REQUESTS --->
router.get("/profile", verify_token, authController.profile__GET);

export default router;
