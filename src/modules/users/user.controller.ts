import { Request, Response, NextFunction } from "express";

import * as service from "./user.service.js";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.signup(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.isVIP,
      req.body.isAdmin
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.login(req.body.email, req.body.password);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.changePassword(
      req.user._id,
      req.body.password,
      req.body.newPassword
    );
    res.end();
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifToken = await service.forgotPassword(req.body.email);
    res.send(verifToken);
  } catch (err) {
    next(err);
  }
};

const forgotPasswordResend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.forgotPasswordResend(req.body.verifToken);
    res.end();
  } catch (err) {
    next(err);
  }
};

const forgotPasswordVerifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.forgotPasswordVerifyOtp(
      req.body.verifToken,
      req.body.enteredOtp
    );
    next();
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    service.resetPassword(req.body.verifToken, req.body.newPassword);
    res.end();
  } catch (err) {
    next(err);
  }
};

export {
  signup,
  login,
  changePassword,
  forgotPassword,
  forgotPasswordResend,
  forgotPasswordVerifyOtp,
  resetPassword,
};
