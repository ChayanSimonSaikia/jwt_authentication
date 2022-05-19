import createHttpError from "http-errors";
import { login_userSchema, register_userSchema } from "../helpers/validation";
import UserModel, { User } from "../models/User.model";
import { DocUser, PromiseUser } from "../Types/types";

export async function createUser(input: DocUser): PromiseUser {
  try {
    const sanitized = await register_userSchema.validateAsync(input); // Validation

    // Is user already exists or not? -->
    const isExists = await UserModel.findOne({
      email: sanitized.email,
    });
    if (isExists)
      throw new createHttpError.Conflict(
        `${sanitized.email} is already exists`
      );

    // Creating new User
    const user = new UserModel(sanitized);
    return user.save();
    /*-----------------------------*/
  } catch (error: any) {
    throw error;
  }
}

export const loginUser = async (input: DocUser): PromiseUser => {
  try {
    // Validate inputs
    const { email, password } = await login_userSchema.validateAsync(input);
    console.log(email, password);

    // Does exists
    const user = await UserModel.findOne({ email });
    if (!user) throw new createHttpError.NotFound("Email/Password invalid");

    // compare passwords
    const isMatch: boolean = await user.comparePassword(password);
    if (!isMatch)
      throw new createHttpError.NotFound("Email/Password is invalid");
    return user;
  } catch (error: any) {
    throw error;
  }
};
