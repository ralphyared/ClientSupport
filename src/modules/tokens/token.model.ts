import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    token: String,
  },

  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
