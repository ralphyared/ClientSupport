import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    token: String,
  },

  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
