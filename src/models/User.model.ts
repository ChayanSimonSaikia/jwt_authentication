import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import logger from "../utils/logger";
import createHttpError from "http-errors";

export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 4 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;

    return next();
  } catch (error: any) {
    logger.error(error);
    next(
      new createHttpError.InternalServerError("Password hashing not working")
    );
  }
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
