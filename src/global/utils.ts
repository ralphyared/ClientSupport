import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import nodemailer from "nodemailer";
import { Server, Socket } from "socket.io";

import { ReqType } from "./enums.js";
import { getComplaintById } from "../modules/complaints/complaint.service.js";

export const validate =
  (schemas: Map<ReqType, ObjectSchema>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const errorMessages = [];

    for (const type of schemas.keys()) {
      const schema = schemas.get(type);
      const { error } = schema!.validate(req[type]);
      if (error) errorMessages.push(error.details[0].message);
    }

    const error = {
      statusCode: 400,
      messages: errorMessages,
    };

    errorMessages.length ? next(error) : next();
  };

export const sendOtpByEmail = async (email: string, otp: number) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAILER_USER,
      to: email,
      subject: "Password Reset",
      text: `Your OTP for password reset is: ${otp}`,
    });
  } catch (err) {
    throw err;
  }
};

export const socketInit = async (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("userLogin", async (userId: string) => {
      try {
        socket.join(userId);
      } catch (err) {
        throw err;
      }
    });
  });
};
