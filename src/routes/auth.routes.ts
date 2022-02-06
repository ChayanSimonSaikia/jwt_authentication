import { Router, Response, Request } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

export default router;
