import createHttpError from "http-errors";
import { DocumentDefinition } from "mongoose";
import { register_userSchema } from "../helpers/validation";
import UserModel, { UserDocument } from "../models/User.model";

export const createUser = async (
  input: DocumentDefinition<UserDocument>
): Promise<UserDocument> => {
  try {
    const sanitized = await register_userSchema.validateAsync(input);

    const isExists = await UserModel.findOne({ email: sanitized.email });
    if (isExists)
      throw new createHttpError.Conflict(
        `${sanitized.email} is already exists`
      );

    const user = new UserModel(sanitized);
    return user.save();
  } catch (error: any) {
    throw error;
  }
};
