import { Request } from "express";
import { Schema } from "joi";
import ResponsError from "../../error/responsError";

export const validate = (schema: Schema, request: Request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    throw new ResponsError(400, result.error.message);
  } else {
    return result.value;
  }
};
