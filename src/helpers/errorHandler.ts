import { NextFunction, Request, Response } from "express";

interface ErrorHandler {
  message: string;
  status: number;
}

export const errorHandler = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.status(status).json({ status, message });
};
