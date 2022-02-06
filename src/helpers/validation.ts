import Joi from "joi";

export const register_userSchema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().required().min(4),
});

export const login_userSchema = Joi.object({
  email: Joi.string().required().email(),
  passowrd: Joi.string().required().min(4),
});
