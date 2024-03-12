import "dotenv/config";
import { hash, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./user.model.js";
import { CustomError } from "../../global/error.class.js";
import {
  defaultErrorMessage,
  userErrorMessages,
} from "../../global/error.messages.js";
import {
  createOtp,
  getUserIdFromOtp,
  incrementOtp,
  verifyOtp,
} from "./otp.service.js";
import { sendOtpByEmail } from "../../global/utils.js";

const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isVIP: boolean,
  isAdmin: boolean
) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    const err = new CustomError(
      userErrorMessages.emailAlreadyInUse.message,
      userErrorMessages.emailAlreadyInUse.status
    );
    throw err;
  }

  const hashedPw = await hash(password, 12);
  const user = new User({
    email: email,
    password: hashedPw,
    firstName: firstName,
    lastName: lastName,
    isAdmin: isAdmin,
    isVIP: isVIP,
  });
  const savedUser = await user.save();
  const userId = savedUser._id;

  const token = await signUserJwt(savedUser);

  return { token, userId };
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    const err = new CustomError(
      userErrorMessages.emailNotFound.message,
      userErrorMessages.emailNotFound.status
    );
    throw err;
  }

  const isEqual = compareSync(password, user.password!);
  if (!isEqual) {
    const err = new CustomError(
      userErrorMessages.wrongPassword.message,
      userErrorMessages.wrongPassword.status
    );

    throw err;
  }
  const userId = user._id;
  const token = await signUserJwt(user);

  return { token, userId };
};

const signUserJwt = async (user: any) => {
  const userObj = { ...user }._doc;
  delete userObj.password;

  const token = jwt.sign(userObj, process.env.JWT_SECRET!);

  return token;
};

const changePassword = async (
  userId: String,
  password: string,
  newPassword: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    const err = new CustomError(
      defaultErrorMessage.defaultError.message,
      defaultErrorMessage.defaultError.status
    );
    throw err;
  }

  const isEqual = compareSync(password, user.password!);
  if (!isEqual) {
    const err = new CustomError(
      userErrorMessages.wrongPassword.message,
      userErrorMessages.wrongPassword.status
    );
    throw err;
  }
  const newhashedPw = await hash(newPassword, 12);
  user.password = newhashedPw;
  return user.save();
};

const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    const err = new CustomError(
      userErrorMessages.emailNotFound.message,
      userErrorMessages.emailNotFound.status
    );
    throw err;
  }
  const otp = await createOtp(user._id);
  await sendOtpByEmail(email, otp.otp!);
  return { verifToken: otp.verifToken };
};

const forgotPasswordResend = async (verifToken: string) => {
  const otp = await incrementOtp(verifToken);
  const user = await User.findById(otp?.userId);
  return sendOtpByEmail(user?.email!, otp?.otp!);
};

const forgotPasswordVerifyOtp = async (
  verifToken: string,
  enteredOtp: number
) => {
  return verifyOtp(verifToken, enteredOtp);
};

const resetPassword = async (verifToken: string, newPassword: string) => {
  const userId = await getUserIdFromOtp(verifToken);
  const user = await User.findById(userId);
  const newhashedPw = await hash(newPassword, 12);
  user!.password = newhashedPw;
  return user!.save();
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
