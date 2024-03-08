import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isVIP: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
