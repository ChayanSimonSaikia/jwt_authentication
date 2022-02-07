import JWT, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import config from "config";
import createHttpError from "http-errors";
import logger from "./logger";

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
