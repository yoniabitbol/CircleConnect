import { Request, Response } from 'express';
import User from '../models/userModel';

// Will require some sort of authentication to get all users
// const getAllUsers = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'Get all users not implemented yet',
//   });
// };

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.query.user_id });
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

// Add firebase admin to delete user once the request is made
// const deleteUser = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'Delete user not implemented yet',
//   });
// };

// Connections API

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

    if (!sender.connections.includes(target.user_id)) {
      await sender.updateOne({ $push: { outgoingRequests: target.user_id } });
      await target.updateOne({ $push: { incomingRequests: sender.user_id } });
      return res.status(200).json({
        status: 'success',
        message: 'Connection request sent',
      });
    }
    return res.status(403).json({
      status: 'success',
      message: 'Connection already exists',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: 'Error sending connection request',
    });
  }
};

const manageConnectionRequest = async (req: Request, res: Response) => {
  // TODO: Add logic to accept or reject connection request
};

export default {
  // getAllUsers,
  getUser,
  createUser,
  updateUser,
  // , deleteUser,
  sendConnectionRequest,
};
