import { Request, Response, NextFunction } from "express";

import * as service from "./category.service.js";
import mongoose from "mongoose";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.createCategory(req.body.title, req.body.description);
    res.end();
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoriesList = await service.getAllCategories();
  res.json(categoriesList);
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);
    const updatedCategory = await service.updateCategory(
      categoryId,
      req.body.title,
      req.body.description
    );
    res.json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);
    await service.deleteCategory(categoryId);
    res.end();
  } catch (err) {
    next(err);
  }
};

const getAllCategoriesAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryList = await service.getAllCategoriesAdmin(
      Number(req.query.page),
      Number(req.query.limit)
    );
    const count = await service.countCategories();
    res.json({
      categoryList,
      totalPages: Math.ceil(count / Number(req.query.limit)),
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);
    const category = await service.getCategoryById(categoryId);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export {
  getAllCategories,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
  getAllCategoriesAdmin,
};
