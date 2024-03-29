import { Request, Response } from 'express';
import User from '../models/userModel';
import admin from '../firebase/config';
import usingAuth from '../usingAuth';

// User Profile API

// Fetches all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'error getting users',
    });
  }
};

// Fetches user based on ID
const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    await user?.populate({ path: 'posts', model: 'Post' });
    await user?.populate({ path: 'applications', model: 'Application' });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'error getting user',
    });
  }
};

// Creates a user document
const createUser = async (req: Request, res: Response) => {
  try {
    const checkUser = await User.findOne({ user_id: req.body.user_id });
    if (!checkUser) {
      const newUser = await User.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    } else {
      res.status(200).json({
        status: 'user exists',
        data: {
          user: checkUser,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'error adding user',
    });
  }
};

// Updates a user based on ID
const updateUser = async (req: any, res: Response) => {
  try {
    const filter = { user_id: req.body.user_id };
    const update = {
      title: req.body.title,
      location: req.body.location,
      phone: req.body.phone,
      website: req.body.website,
      connections: req.body.connections,
      summary: req.body.summary,
      projects: req.body.projects ? JSON.parse(req.body.projects) : '',
      skills: req.body.skills ? JSON.parse(req.body.skills) : '',
      experience: req.body.experience ? JSON.parse(req.body.experience) : '',
      education: req.body.education ? JSON.parse(req.body.education) : '',
      languages: req.body.languages ? JSON.parse(req.body.languages) : '',
      awards: req.body.awards ? JSON.parse(req.body.awards) : '',
      courses: req.body.courses ? JSON.parse(req.body.courses) : '',
      picture:
        req.files && req.files.picture
          ? req.files.picture[0].filename
          : req.body.picture,
      backdrop:
        req.files && req.files.backdrop
          ? req.files.backdrop[0].filename
          : req.body.backdrop,
      resume:
        req.files && req.files.resume
          ? req.files.resume[0].filename
          : req.body.resume,
      coverLetter:
        req.files && req.files.coverLetter
          ? req.files.coverLetter[0].filename
          : req.body.coverLetter,
    };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'error updating user',
    });
  }
};

// Deletes a user based on ID
const deleteUser = async (req: Request, res: Response) => {
  try {
    if (usingAuth()) {
      await admin.auth().deleteUser(req.params.user_id);
    }
    const user = await User.findOneAndDelete({ user_id: req.params.user_id });
    res.status(200).json({
      status: 'success',
      message: `User ${user?.name} deleted`,
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error deleting user',
    });
  }
};

// Job Preference Tags API
const updateUserPreferenceTags = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User does not exist',
      });
    }
    const { preferenceTags } = req.body; // Access preferenceTags directly from req.body

    await user.updateOne({ preferenceTags });
    return res.status(200).json({
      status: 'success',
      message: 'Job preference tags updated',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error updating preference tags',
    });
  }
};

// Connections API

// Fetches all connections for a user
const getUserConnections = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    const connections = user?.connections;
    const connectionProfiles = await User.find({
      user_id: { $in: connections },
    });
    res.status(200).json({
      status: 'success',
      data: {
        connections: connectionProfiles,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error getting user connections',
    });
  }
};

// Sends a connection request to another user
const sendConnectionRequest = async (req: Request, res: Response) => {
  if (req.params.user_id === req.body.user_id) {
    return res.status(400).json({
      status: 'error',
      message: 'Cannot send connection request to self',
    });
  }
  try {
    const sender: any = await User.findOne({ user_id: req.body.user_id });
    const target: any = await User.findOne({ user_id: req.params.user_id });

    if (!sender || !target) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing fields: connection sender or target',
      });
    }

    if (
      !sender.outgoingRequests.includes(target.user_id)
      && !target.incomingRequests.includes(sender.user_id)
      && !sender.connections.includes(target.user_id)
      && !target.connections.includes(sender.user_id)
    ) {
      await sender.updateOne({ $push: { outgoingRequests: target.user_id } });
      await target.updateOne({ $push: { incomingRequests: sender.user_id } });
      return res.status(200).json({
        status: 'success',
        message: 'Connection request sent',
      });
    }
    return res.status(403).json({
      status: 'failure',
      message: 'Connection already exists',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error sending connection request',
    });
  }
};

// Accepts a connection request from another user
const acceptConnectionRequest = async (req: Request, res: Response) => {
  try {
    const sender: any = await User.findOne({ user_id: req.body.user_id });
    const target: any = await User.findOne({ user_id: req.params.user_id });

    if (
      !sender.connections.includes(target.user_id)
      && !target.connections.includes(sender.user_id)
      && sender.incomingRequests.includes(target.user_id)
      && target.outgoingRequests.includes(sender.user_id)
    ) {
      await sender.updateOne({ $pull: { incomingRequests: target.user_id } });
      await target.updateOne({ $pull: { outgoingRequests: sender.user_id } });
      await sender.updateOne({ $push: { connections: target.user_id } });
      await target.updateOne({ $push: { connections: sender.user_id } });
      return res.status(200).json({
        status: 'success',
        message: 'Connection request accepted',
      });
    }
    return res.status(403).json({
      status: 'failure',
      message: 'No incoming request to accept',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error accepting connection request',
    });
  }
};

// Rejects a connection request from another user
const declineConnectionRequest = async (req: Request, res: Response) => {
  try {
    const sender: any = await User.findOne({ user_id: req.body.user_id });
    const target: any = await User.findOne({ user_id: req.params.user_id });

    if (
      !sender.connections.includes(target.user_id)
      && !target.connections.includes(sender.user_id)
    ) {
      await sender.updateOne({ $pull: { incomingRequests: target.user_id } });
      await target.updateOne({ $pull: { outgoingRequests: sender.user_id } });
      res.status(200).json({
        status: 'success',
        message: 'Connection request declined',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error declining connection request',
    });
  }
};

// Cancels a connection request from another user
const cancelConnectionRequest = async (req: Request, res: Response) => {
  try {
    const sender = await User.findOne({ user_id: req.body.user_id });
    const target = await User.findOne({ user_id: req.params.user_id });

    if (!sender || !target) {
      return res.status(404).json({
        status: 'failure',
        message: 'User not found',
      });
    }
    if (
      !sender.outgoingRequests.includes(target.user_id)
      && !target.incomingRequests.includes(sender.user_id)
    ) {
      return res.status(403).json({
        status: 'failure',
        message: 'No outgoing request to cancel',
      });
    }

    await sender.updateOne({ $pull: { outgoingRequests: target.user_id } });
    await target.updateOne({ $pull: { incomingRequests: sender.user_id } });

    return res.status(200).json({
      status: 'success',
      message: 'Outgoing request cancelled',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failure',
      message: 'Error cancelling outgoing request',
      error: err,
    });
  }
};

// Removes a connection between another user
const removeConnection = async (req: Request, res: Response) => {
  try {
    const sender: any = await User.findOne({ user_id: req.body.user_id });
    const target: any = await User.findOne({ user_id: req.params.user_id });

    if (
      sender.connections.includes(target.user_id)
      && target.connections.includes(sender.user_id)
    ) {
      await sender.updateOne({ $pull: { connections: target.user_id } });
      await target.updateOne({ $pull: { connections: sender.user_id } });
      return res.status(200).json({
        status: 'success',
        message: 'Connection removed',
      });
    }
    return res.status(403).json({
      status: 'failure',
      message: 'Connection does not exist',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error removing connection',
    });
  }
};

// Gets all incoming connection requests for a user
const getIncomingRequests = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User does not exist',
      });
    }
    const incomingRequests = user?.incomingRequests;
    const connectionProfiles = await User.find({
      user_id: { $in: incomingRequests },
    });
    return res.status(200).json({
      status: 'success',
      data: {
        requests:
          connectionProfiles.length > 0
            ? connectionProfiles
            : 'No incoming requests',
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error getting incoming requests',
    });
  }
};

// Gets all outgoing connection requests for a user
const getOutgoingRequests = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User does not exist',
      });
    }
    const outgoingRequests = user?.outgoingRequests;
    const connectionProfiles = await User.find({
      user_id: { $in: outgoingRequests },
    });

    return res.status(200).json({
      status: 'success',
      data: {
        requests:
          connectionProfiles.length > 0
            ? connectionProfiles
            : 'No outgoing requests',
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error getting outgoing requests',
    });
  }
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserConnections,
  sendConnectionRequest,
  acceptConnectionRequest,
  declineConnectionRequest,
  removeConnection,
  cancelConnectionRequest,
  getIncomingRequests,
  getOutgoingRequests,
  updateUserPreferenceTags,
};
