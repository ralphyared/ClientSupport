import { Request, Response, NextFunction } from "express";

import * as service from "./complaint.service.js";

const submitComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.submitComplaint(
      req.body.title,
      req.body.body,
      req.body.status,
      req.body.categoryId,
      req.user._id
    );
    res.end();
  } catch (err) {
    next(err);
  }
};

const getUserComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const complaint = await service.getUserComplaint(
      req.user._id,
      req.params.complaintId
    );
    res.json(complaint);
  } catch (err) {
    next(err);
  }
};

const getAllUserComplaints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const complaintList = await service.getAllUserComplaints(
      req.user._id,
      Number(req.query.page),
      Number(req.query.limit)
    );
    const count = await service.countUserComplaints(req.user._id);
    res.json({
      complaintList,
      totalPages: Math.ceil(count / Number(req.query.limit)),
    });
  } catch (err) {
    next(err);
  }
};

const deleteUserComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.deleteUserComplaint(req.user._id, req.params.complaintId);
    res.end();
  } catch (err) {
    next(err);
  }
};

const updateComplaintStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;
    const io = req.app.get("io");

    await service.updateComplaintStatus(complaintId, status, io);

    res.end();
  } catch (err) {
    next(err);
  }
};

const getAllComplaintsFiltered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const complaintList = await service.getAllComplaintsFiltered(
      Number(req.query.page),
      Number(req.query.limit),
      req.query.userId,
      req.query.status
    );
    const count = await service.countUserComplaints(req.query.userId);
    res.json({
      complaintList,
      totalPages: Math.ceil(count / Number(req.query.limit)),
    });
  } catch (err) {
    next(err);
  }
};

const getComplaintById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return service.getComplaintById(req.body.complaintId);
};

export {
  submitComplaint,
  getAllUserComplaints,
  getUserComplaint,
  deleteUserComplaint,
  updateComplaintStatus,
  getAllComplaintsFiltered,
  getComplaintById,
};
