import Joi, { ObjectSchema } from "joi";
import { ReqType } from "../../global/enums.js";

const createCategorySchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      title: Joi.string(),
      description: Joi.string(),
    }),
  ],
]);

const getAllCategoriesAdminSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.QUERY,
    Joi.object({
      query: Joi.number(),
      limit: Joi.number(),
    }),
  ],
]);

const getCategoryByIdSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.PARAMS,
    Joi.object({
      categoryId: Joi.string(),
    }),
  ],
]);

const updateCategorySchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.PARAMS,
    Joi.object({
      categoryId: Joi.string(),
    }),
  ],
  [
    ReqType.BODY,
    Joi.object({
      title: Joi.string(),
      description: Joi.string(),
    }),
  ],
]);

const deleteCategorySchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.PARAMS,
    Joi.object({
      categoryId: Joi.string(),
    }),
  ],
]);

export {
  createCategorySchema,
  getAllCategoriesAdminSchema,
  getCategoryByIdSchema,
  updateCategorySchema,
  deleteCategorySchema,
};
