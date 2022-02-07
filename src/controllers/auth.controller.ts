import { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "../services/auth.services";
import client from "../utils/init_redis";
import { sign_AccessToken, sign_RefreshToken } from "../utils/init_token";

export default {
  /** GET REQUESTS **/
  register__GET: async (req: Request, res: Response, next: NextFunction) => {
    res.send("Register Page");
  },

  /** POST REQUESTS **/
  register__POST: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Create User
      const user = await createUser(req.body);

      //Generating tokens
      const accessToken = await sign_AccessToken(user._id.toString()); // Access token
      const refreshToken = await sign_RefreshToken(user._id.toString()); //Refresh token

      res.status(200).json({
        message: "User Created",
        tokens: { accessToken, refreshToken },
      });
    } catch (error: any) {
      if (error.name === "ValidationError") error.status = 422;
      next(error);
    }
  },

  login__POST: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await loginUser(req.body);
      //Generating tokens
      const accessToken = await sign_AccessToken(user._id.toString()); // Access token
      const refreshToken = await sign_RefreshToken(user._id.toString()); //Refresh tokens

      await client.setEx(user._id.toString(), 365 * 24 * 60 * 60, refreshToken);
      res.json({
        message: "User logged in successfully",
        tokens: { accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  },
};
