import { Types } from "mongoose";
import { CustomError } from "../../global/error.class.js";
import { categoryErrorMessages } from "../../global/error.messages.js";
import Category from "./category.model.js";

const getCategoryById = async (categoryId: Types.ObjectId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    const err = new CustomError(
      categoryErrorMessages.categoryNotFound.message,
      categoryErrorMessages.categoryNotFound.status
    );
    throw err;
  }
  return category;
};

const getAllCategories = async () => {
  return Category.find();
};

const createCategory = async (title: String, description: String) => {
  const category = new Category({
    title,
    description,
  });
  return category.save();
};

const updateCategory = async (
  categoryId: Types.ObjectId,
  title?: String,
  description?: String
) => {
  await getCategoryById(categoryId);
  await Category.updateOne(
    { _id: categoryId },
    { $set: { title, description } }
  );
};

const deleteCategory = async (categoryId: Types.ObjectId) => {
  await getCategoryById(categoryId);
  await Category.deleteOne({ _id: categoryId });
};

const countCategories = async () => {
  return Category.countDocuments();
};

const getAllCategoriesAdmin = async (page: number, limit: number) => {
  return Category.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
};

export {
  getCategoryById,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategoriesAdmin,
  countCategories,
};
