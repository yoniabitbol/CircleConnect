import { Request, Response } from 'express';
import Application from '../models/applicationModel';
import Post from '../models/postModel';
import User from '../models/userModel';

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

const sendApplication = async (req: Request, res: Response) => {
  try {
    const application = Application.create(req.body);
    const post = Post.findById(req.params.post_id);
    const user = User.findOne({ user_id: req.body.user_id });

    if (!post) {
      return res.status(403).json({
        status: 'failure',
        message: 'Post not found',
      });
    }
    await post.updateOne({ $push: { applications: application } });
    await user?.updateOne({ $push: { applications: application } });
    return res.status(200).json({
      status: 'success',
      message: 'Application sent successfully',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error sending application',
    });
  }
};

const withdrawApplication = async (req: Request, res: Response) => {
  // check post ID and pull it from that post's applications array.
  try {
    const application = Application.findById(req.params.application_id);
    const post = Post.findById(req.params.post_id);
    const user = User.findOne({ user_id: req.body.user_id });

    if (!application) {
      return res.status(403).json({
        status: 'failure',
        message: 'Application not found',
      });
    }
    await post.updateOne({ $pull: { applications: application } });
    await user?.updateOne({ $pull: { applications: application } });
    return res.status(200).json({
      status: 'success',
      message: 'Application withdrawn successfully',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error withdrawing application',
    });
  }
};

export default {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  sendApplication,
  withdrawApplication,
};

// send existing app?
