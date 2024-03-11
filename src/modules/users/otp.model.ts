import { string } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
    otp: Number,
    verifToken: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

export default mongoose.model("Otp", otpSchema);
