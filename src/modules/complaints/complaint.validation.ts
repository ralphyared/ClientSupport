import Joi, { ObjectSchema } from "joi";
import { ComplaintStatus, ReqType } from "../../global/enums.js";

const submitComplaintSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      title: Joi.string(),
      body: Joi.string(),
      status: Joi.string().valid(...Object.values(ComplaintStatus)),
      categoryId: Joi.string(),
    }),
  ],
]);

const getUserComplaintSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.PARAMS,
    Joi.object({
      complaintId: Joi.string(),
    }),
  ],
]);

const getAllUserComplaintsSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.QUERY,
    Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
    }),
  ],
]);

const deleteUserComplaintSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.PARAMS,
    Joi.object({
      complaintId: Joi.string(),
    }),
  ],
]);

const updateComplaintStatusSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.PARAMS,
    Joi.object({
      complaintId: Joi.string(),
    }),
  ],
  [
    ReqType.BODY,
    Joi.object({
      status: Joi.string().valid(...Object.values(ComplaintStatus)),
    }),
  ],
]);

export {
  submitComplaintSchema,
  getUserComplaintSchema,
  getAllUserComplaintsSchema,
  deleteUserComplaintSchema,
  updateComplaintStatusSchema,
};
