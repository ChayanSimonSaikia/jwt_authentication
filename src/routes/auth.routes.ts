import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { verify_token } from "../utils/init_token";
const router = Router();

// POST REQUESTS --->
router
  .post("/register", authController.register__POST)
  .post("/login", authController.login__POST);

// GET REQUESTS --->
router.get("/profile", verify_token, authController.profile__GET);

export default router;
