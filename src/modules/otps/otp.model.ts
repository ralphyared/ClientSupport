import mongoose from "mongoose";

const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
    otp: String,
  },

  { timestamps: true }
);

export default mongoose.model("Otp", otpSchema);
