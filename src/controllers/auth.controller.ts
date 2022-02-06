import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { createUser } from "../services/auth.services";
import logger from "../utils/logger";

export default {
  getRegister: async (req: Request, res: Response, next: NextFunction) => {
    res.send("Register Page");
  },

  postRegister: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createUser(req.body);
      res.status(200).json({ message: "User Created" });
    } catch (error: any) {
      if (error.name === "ValidationError") error.status = 422;
      next(error);
    }
  },
};
