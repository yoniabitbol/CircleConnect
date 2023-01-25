import { Request, Response } from 'express';
import User from '../models/userModel';

const getAllUsers = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'Get all users not implemented yet',
  });
};

const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'Get user not implemented yet',
  });
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
      res.status(201).json({
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
    const update = {
      profile: {
        photo: req.body.profile.photo,
        education: req.body.profile.education,
        awards: req.body.profile.awards,
        work: req.body.profile.work,
        contact_info: {
          phone_number: req.body.profile.contact_info.phone_number,
          contact_email: req.body.profile.contact_info.contact_email,
        },
      },
    };
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

const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'Delete user not implemented yet',
  });
};

export default {
  getAllUsers, getUser, createUser, updateUser, deleteUser,
};
