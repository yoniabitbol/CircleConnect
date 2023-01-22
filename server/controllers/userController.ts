import { Request, Response } from 'express';
import User from '../models/userModel';

exports.createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been implemented yet',
  });
};
