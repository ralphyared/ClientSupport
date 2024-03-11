import express from "express";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getAllCategoriesAdmin,
  getCategoryById,
  updateCategory,
} from "./category.controller.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  getAllCategoriesAdminSchema,
  getCategoryByIdSchema,
  updateCategorySchema,
} from "./category.validation.js";
import { validate } from "../../global/utils.js";
import { isAuthenticated, isAuthorized } from "../users/auth.middleware.js";

const router = express.Router();

router.get("/list", getAllCategories);

router.post(
  "/create",
  isAuthenticated,
  isAuthorized,
  validate(createCategorySchema),
  createCategory
);

router.get(
  "/all",
  isAuthenticated,
  isAuthorized,
  validate(getAllCategoriesAdminSchema),
  getAllCategoriesAdmin
);

router.get(
  "/:categoryId",
  isAuthenticated,
  isAuthorized,
  validate(getCategoryByIdSchema),
  getCategoryById
);

router.patch(
  "/update/:categoryId",
  isAuthenticated,
  isAuthorized,
  validate(updateCategorySchema),
  updateCategory
);

router.delete(
  "/delete/:categoryId",
  isAuthenticated,
  isAuthorized,
  validate(deleteCategorySchema),
  deleteCategory
);

export default router;
