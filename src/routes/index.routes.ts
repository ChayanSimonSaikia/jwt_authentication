import { Application, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { errorHandler } from "../helpers/errorHandler";
import authRoutes from "./auth.routes";

export const routes = (app: Application) => {
  // Custom routes
  app.use("/auth", authRoutes);

  // 404 Page not found
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
  });
  // Error Handler
  app.use(errorHandler);
};
