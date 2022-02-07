import JWT, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import config from "config";
import createHttpError from "http-errors";
import logger from "./logger";
import { Request, Response, NextFunction, Express } from "express";

export const sign_AccessToken = (
  user_id: string
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const payload: JwtPayload = { role: "User authentication" };
    const secret: Secret = config.get<string>("ACCESS_TOKEN_KEY");
    const options: SignOptions = {
      subject: user_id,
      audience: "http://localhost:3000",
      issuer: "Chayan Simon Saikia",
      expiresIn: "5m",
    };
    return JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        logger.error(err);
        return reject(new createHttpError.InternalServerError());
      }
      return resolve(token);
    });
  });
};

export const sign_RefreshToken = (user_id: string): Promise<string> => {
  // Returns a Promise
  return new Promise((resolve, reject) => {
    // JWT.sign(Arguments) -->
    const payload: JwtPayload = { role: "Refresh the access token" };
    const secret: Secret = config.get<string>("REFRESH_TOKEN_KEY");
    const options: SignOptions = {
      subject: user_id,
      audience: "http://localhost:3000",
      issuer: "Chayan Simon Saikia",
      expiresIn: "1y",
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        logger.error(err);
        return reject(new createHttpError.InternalServerError());
      }
      if (!token) throw new createHttpError.InternalServerError();
      resolve(token);
    });
  });
};
declare global {
  namespace Express {
    interface Request {
      userid: string | JWT.JwtPayload | undefined;
    }
  }
}
export const verify_token = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth_header = req.headers["authorization"];
  if (!auth_header) throw new createHttpError.Unauthorized();

  const bearer = auth_header.split(" ");
  const token = bearer[1];
  JWT.verify(token, config.get<string>("ACCESS_TOKEN_KEY"), (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(new createHttpError.Unauthorized(message));
    }
    if (!payload) throw new createHttpError.Unauthorized();
    req.userid = payload.sub;
    next();
  });
};
