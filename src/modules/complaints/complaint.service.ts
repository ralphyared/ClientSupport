import Complaint from "./complaint.model.js";

import { CustomError } from "../../global/error.class.js";
import { complaintErrorMessages } from "../../global/error.messages.js";

const submitComplaint = async (
  title: String,
  body: String,
  status: String,
  categoryId: String,
  createdBy: String
) => {
  const complaint = new Complaint({
    title,
    body,
    status,
    categoryId,
    createdBy,
  });
  await complaint.save();
  return complaint._id;
};

const getUserComplaint = async (userId: String, complaintId: String) => {
  const complaint = await Complaint.findOne({
    _id: complaintId,
    createdBy: userId,
  });
  if (complaint == null) {
    const err = new CustomError(
      complaintErrorMessages.complaintNotFound.message,
      complaintErrorMessages.complaintNotFound.status
    );
    throw err;
  }
  return complaint;
};

const getAllUserComplaints = async (
  userId: String,
  page: number,
  limit: number
) => {
  return Complaint.find({ createdBy: userId })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
};

const countUserComplaints = async (userId?: any) => {
  if (userId) {
    return Complaint.countDocuments({ createdBy: userId as string });
  }
  return Complaint.countDocuments();
};

const deleteUserComplaint = async (userId: String, complaintId: String) => {
  const complaint = await Complaint.findOne({
    _id: complaintId,
    createdBy: userId,
  });
  if (complaint == null) {
    const err = new CustomError(
      complaintErrorMessages.notAuthDeleteComplaint.message,
      complaintErrorMessages.notAuthDeleteComplaint.status
    );
    throw err;
  }
  return Complaint.deleteOne({ _id: complaintId });
};

const updateComplaintStatus = async (complaintId: String, status: string) => {
  const complaint = await Complaint.findById(complaintId);
  if (!complaint) {
    const err = new CustomError(
      complaintErrorMessages.complaintNotFound.message,
      complaintErrorMessages.complaintNotFound.status
    );
    throw err;
  }
  complaint.status = status.toUpperCase();
  await complaint.save();
  return complaint;
};

const getAllComplaintsFiltered = async (
  page: number,
  limit: number,
  userId?: any,
  status?: any
) => {
  const filter: any = {};
  if (userId) filter.createdBy = userId as string;
  if (status) filter.status = (status as string).toUpperCase();

  return Complaint.find(filter)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: 1 });
};

const getComplaintById = async (complaintId: String) => {
  return Complaint.findById(complaintId);
};

export {
  submitComplaint,
  getAllUserComplaints,
  countUserComplaints,
  getUserComplaint,
  deleteUserComplaint,
  updateComplaintStatus,
  getAllComplaintsFiltered,
  getComplaintById,
};
