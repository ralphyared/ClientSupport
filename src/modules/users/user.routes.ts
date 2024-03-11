import express from "express";

import {
  signup,
  login,
  changePassword,
  forgotPassword,
  forgotPasswordResend,
  forgotPasswordVerifyOtp,
  resetPassword,
} from "./user.controller.js";
import { validate } from "../../global/utils.js";
import {
  signupSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  forgotPasswordResendSchema,
  resetPasswordSchema,
} from "./user.validation.js";
import { isAuthenticated } from "./auth.middleware.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);

router.post("/login", validate(loginSchema), login);

router.patch(
  "/password",
  isAuthenticated,
  validate(changePasswordSchema),
  changePassword
);

router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

router.post(
  "/forgot-password-resend",
  validate(forgotPasswordResendSchema),
  forgotPasswordResend
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  forgotPasswordVerifyOtp,
  resetPassword
);

export default router;
