import { Request, Response } from 'express';
import Thread from '../models/threadModel';
import User from '../models/userModel';

const getUserThreads = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    const threads = await Thread.find({ participants: user?.user_id });
    res.status(200).json({
      status: 'success',
      data: {
        threads,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

const createThread = async (req: Request, res: Response) => {
  try {
    const thread = await Thread.create({
      participants: [req.body.participant1, req.body.participant2],
    });
    res.status(201).json({
      status: 'success',
      data: {
        thread,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: err,
    });
  }
};

export default {
  getUserThreads,
  createThread,
};
