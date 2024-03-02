import * as Joi from "joi";

export const createLikeThread = Joi.object({
  author: Joi.number(),
  thread: Joi.number(),
});

export const createLikeReply = Joi.object({
  author: Joi.number(),
  reply: Joi.number(),
});
