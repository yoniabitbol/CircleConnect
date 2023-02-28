import { Request, Response } from 'express';
import Application from '../models/applicationModel';

const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find();
    res.status(200).json({
      status: 'success',
      data: {
        applications,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: `ERROR ${err}`,
      message: 'Error getting applications',
    });
  }
};

const getApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.application_id);
    res.status(200).json({
      status: 'success',
      data: {
        application,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error getting application',
    });
  }
};

const createApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        application,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error creating application',
    });
  }
};

const updateApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.application_id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        application,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error updating application',
    });
  }
};

const deleteApplication = async (req: Request, res: Response) => {
  try {
    await Application.findByIdAndDelete(req.params.application_id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error deleting application',
    });
  }
};

export default {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
