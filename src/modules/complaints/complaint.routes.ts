import express from "express";

import {
  deleteUserComplaint,
  getAllUserComplaints,
  getUserComplaint,
  submitComplaint,
  updateComplaintStatus,
  getAllComplaintsFiltered,
} from "./complaint.controller.js";
import {
  submitComplaintSchema,
  getUserComplaintSchema,
  getAllUserComplaintsSchema,
  deleteUserComplaintSchema,
  updateComplaintStatusSchema,
} from "./complaint.validation.js";
import { validate } from "../../global/utils.js";
import { isAuthenticated, isAuthorized } from "../users/auth.middleware.js";

const router = express.Router();

router.post(
  "/submit",
  isAuthenticated,
  validate(submitComplaintSchema),
  submitComplaint
);

router.get(
  "/get/:complaintId",
  isAuthenticated,
  validate(getUserComplaintSchema),
  getUserComplaint
);

router.get(
  "/list",
  isAuthenticated,
  validate(getAllUserComplaintsSchema),
  getAllUserComplaints
);

router.delete(
  "/delete/:complaintId",
  isAuthenticated,
  validate(deleteUserComplaintSchema),
  deleteUserComplaint
);

router.patch(
  "/status/:complaintId",
  isAuthenticated,
  isAuthorized,
  validate(updateComplaintStatusSchema),
  updateComplaintStatus
);

router.get("/all", isAuthenticated, isAuthorized, getAllComplaintsFiltered);

export default router;
