import { object } from "joi";
import mongoose from "mongoose";
import { ComplaintStatus } from "../../global/enums.js";

const Schema = mongoose.Schema;

const complaintSchema = new Schema(
  {
    title: String,
    body: String,
    status: {
      type: String,
      enum: ComplaintStatus,
      default: ComplaintStatus.PENDING,
    },
    categoryId: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    createdBy: Schema.Types.ObjectId,
  },

  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
