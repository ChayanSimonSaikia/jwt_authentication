import createHttpError from "http-errors";
import { DocumentDefinition } from "mongoose";
import { login_userSchema, register_userSchema } from "../helpers/validation";
import UserModel, { User } from "../models/User.model";

export const createUser = async (
  input: DocumentDefinition<User>
): Promise<User> => {
  try {
    const sanitized = await register_userSchema.validateAsync(input); // Validation

    // Is user already exists or not? -->
    const isExists = await UserModel.findOne({ email: sanitized.email });
    if (isExists)
      throw new createHttpError.Conflict(
        `${sanitized.email} is already exists`
      );

    // Creating new User
    const user = new UserModel(sanitized);
    return user.save();
  } catch (error: any) {
    throw error;
  }
};

export const loginUser = async (input: DocumentDefinition<User>) => {
  try {
    // Validate inputs
    const { email, password } = await login_userSchema.validateAsync(input);
    console.log(email, password);

    // Does exists
    const user = await UserModel.findOne({ email });
    if (!user) throw new createHttpError.NotFound("Email/Password invalid");
    console.log(user);

    // compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      throw new createHttpError.NotFound("Email/Password is invalid");
    return user;
  } catch (error: any) {
    throw error;
  }
};
