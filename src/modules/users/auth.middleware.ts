import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userErrorMessages } from "../../global/error.messages.js";

import "../../types/types.js";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error(userErrorMessages.notAuthenticated.message);
    res.status(userErrorMessages.notAuthenticated.status);
    next(error);
    return;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken: Object;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    const error = new Error(userErrorMessages.notAuthenticated.message);
    res.status(userErrorMessages.notAuthenticated.status);
    next(error);
    return;
  }

  req.user = decodedToken;
  next();
};
