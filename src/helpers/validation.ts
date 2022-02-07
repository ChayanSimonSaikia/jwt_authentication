import Joi, { valid } from "joi";

interface UserSchema {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const register_userSchema: Joi.ObjectSchema<UserSchema> = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ messages: { "any.only": "Password is not matching" } }),
});

export const login_userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(4),
});
