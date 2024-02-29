import Joi = require("joi");

export const replyThreadSchema = Joi.object({
  content: Joi.string().max(150).optional(),
  image: Joi.string().optional(),
  thread: Joi.number().required(),
  author: Joi.number().required(),
});

export const repliesSchema = Joi.object({
  content: Joi.string().max(150).optional(),
  image: Joi.string().optional(),
  thread: Joi.number().required(),
  author: Joi.number().required(),
});
