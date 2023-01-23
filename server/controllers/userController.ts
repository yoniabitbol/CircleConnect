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
    // maybe add some better handling for duplicate users
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
    // }
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'error adding user',
    });
  }
};

const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'Edit user not implemented yet',
  });
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
