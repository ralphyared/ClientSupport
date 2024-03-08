import { object } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const complaintSchema = new Schema(
  {
    title: String,
    body: String,
    status: {
      type: String,
      enum: ["PENDING", "INPROGRESS", "RESOLVED", "REJECTED"],
      default: "PENDING",
    },
    categoryId: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },

  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
