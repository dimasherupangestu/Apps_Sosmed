import Joi = require("joi");

export const registerSchema = Joi.object({
  name: Joi.string().max(100).required(),
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
