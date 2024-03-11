import Joi, { ObjectSchema } from "joi";
import { ReqType } from "../../global/enums.js";

const signupSchema: Map<ReqType, ObjectSchema> = new Map<ReqType, ObjectSchema>(
  [
    [
      ReqType.BODY,
      Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        categoryId: Joi.string(),
        password: Joi.string(),
        isVIP: Joi.boolean(),
        isAdmin: Joi.boolean(),
      }),
    ],
  ]
);

const loginSchema: Map<ReqType, ObjectSchema> = new Map<ReqType, ObjectSchema>([
  [
    ReqType.BODY,
    Joi.object({
      email: Joi.string().email(),
      password: Joi.string(),
    }),
  ],
]);

const changePasswordSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      password: Joi.string(),
      newPassword: Joi.string(),
    }),
  ],
]);

const forgotPasswordSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      email: Joi.string().email(),
    }),
  ],
]);

const forgotPasswordResendSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      verifToken: Joi.string(),
    }),
  ],
]);

const resetPasswordSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      verifToken: Joi.string(),
      newPassword: Joi.string(),
      enteredOtp: Joi.number(),
    }),
  ],
]);

export {
  signupSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  forgotPasswordResendSchema,
  resetPasswordSchema,
};
