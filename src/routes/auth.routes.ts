import { Router, Response, Request } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// GET REQUESTS --->
router.get("/register", authController.register__GET);

export default router;
