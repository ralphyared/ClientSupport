import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User from "./user.model.js";
import { CustomError } from "../../global/error.class.js";
import { userErrorMessages } from "../../global/error.messages.js";

import "../../types/types.js";
import mongoose, { Types } from "mongoose";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new CustomError(
      userErrorMessages.notAuthenticated.message,
      userErrorMessages.notAuthenticated.status
    );
    next(error);
    return;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    const error = new CustomError(
      userErrorMessages.notAuthenticated.message,
      userErrorMessages.notAuthenticated.status
    );
    next(error);
    return;
  }

  req.user = decodedToken;
  next();
};

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user._id);

  if (user?.isAdmin == false) {
    const err = new CustomError(
      userErrorMessages.notAuthorized.message,
      userErrorMessages.notAuthorized.status
    );
    next(err);
  }
  next();
};
