import { Request, Response } from 'express';
import User from '../models/userModel';
import admin from '../firebase/config';

// User Profile API

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

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const filter = { user_id: req.body.user_id };
    const update = req.body.profile;
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(201).json({
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    await admin.auth().deleteUser(req.params.user_id);
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

// Connections API

const getUserConnections = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    const connections = user?.connections;
    const connectionProfiles = await User.find({ user_id: { $in: connections } });
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

    if (!sender.outgoingRequests.includes(target.user_id) && !target.incomingRequests.includes(sender.user_id)
        && !sender.connections.includes(target.user_id) && !target.connections.includes(sender.user_id)) {
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

const acceptConnectionRequest = async (req: Request, res: Response) => {
  try {
    const sender: any = await User.findOne({ user_id: req.body.user_id });
    const target: any = await User.findOne({ user_id: req.params.user_id });

    if (!sender.connections.includes(target.user_id) && !target.connections.includes(sender.user_id)
        && sender.incomingRequests.includes(target.user_id) && target.outgoingRequests.includes(sender.user_id)) {
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
      message: 'Error accepting connection request',
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error accepting connection request',
    });
  }
};

const declineConnectionRequest = async (req: Request, res: Response) => {
  try {
    const sender: any = await User.findOne({ user_id: req.body.user_id });
    const target: any = await User.findOne({ user_id: req.params.user_id });

    if (!sender.connections.includes(target.user_id) && !target.connections.includes(sender.user_id)) {
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

const removeConnection = async (req: Request, res: Response) => {
  try {
    const sender: any = await User.findOne({ user_id: req.body.user_id });
    const target: any = await User.findOne({ user_id: req.params.user_id });

    if (sender.connections.includes(target.user_id) && target.connections.includes(sender.user_id)) {
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
    const connectionProfiles = await User.find({ user_id: { $in: incomingRequests } });
    if (connectionProfiles.length === 0) {
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'No incoming requests',
        },
      });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        connections: connectionProfiles,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'Error getting incoming requests',
    });
  }
};

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
    const connectionProfiles = await User.find({ user_id: { $in: outgoingRequests } });
    if (connectionProfiles.length === 0) {
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'No outgoing requests',
        },
      });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        connections: connectionProfiles,
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
  getIncomingRequests,
  getOutgoingRequests,
};
