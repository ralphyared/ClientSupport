import otpGenerator from "otp-generator";
import { Types } from "mongoose";

import Otp from "./otp.model.js";
import { CustomError } from "../../global/error.class.js";
import { userErrorMessages } from "../../global/error.messages.js";

const createOtp = (userId: Types.ObjectId) => {
  const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
  const verifToken = otpGenerator.generate();
  const newOtp = new Otp({
    otp: otp,
    userId: userId,
    verifToken: verifToken,
  });
  return newOtp.save();
};

const incrementOtp = async (verifToken: string) => {
  const otp = await Otp.findOne({ verifToken: verifToken });
  const newOtp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
  await Otp.updateOne({ verifToken: verifToken }, { $set: { otp: newOtp } });
  return otp;
};

const verifyOtp = async (verifToken: string, enteredOtp: number) => {
  const otp = await Otp.findOne({ verifToken: verifToken });
  if (!(enteredOtp === otp?.otp)) {
    const err = new CustomError(
      userErrorMessages.incorrectOtp.message,
      userErrorMessages.incorrectOtp.status
    );
    throw err;
  }
  return;
};

const getUserIdFromOtp = async (verifToken: string) => {
  const otp = await Otp.findOne({ verifToken: verifToken });
  return otp?.userId;
};

export { createOtp, incrementOtp, verifyOtp, getUserIdFromOtp };
