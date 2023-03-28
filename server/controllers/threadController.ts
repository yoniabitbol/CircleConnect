import { Request, Response } from 'express';
import Thread from '../models/threadModel';
import User from '../models/userModel';

const getAllThreads = async (req: Request, res: Response) => {
  try {
    const threads = await Thread.find();
    res.status(200).json({
      status: 'success',
      data: {
        threads,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: `ERROR ${err}`,
      message: 'Failed to get all threads',
    });
  }
};

const getUserThreads = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    const threads = await Thread.find({
      participants: { $in: [user?.user_id] },
    });
    res.status(200).json({
      status: 'success',
      data: {
        threads,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: `ERROR ${err}`,
      message: 'Failed to get user threads',
    });
  }
};

const createThread = async (req: Request, res: Response) => {
  try {
    const existingThread = await Thread.findOne({
      participants: { $all: [req.body.participant1, req.body.participant2] },
    });

    if (existingThread) {
      res.status(403).json({
        status: 'failure',
        data: {
          message: 'Thread already exists',
          thread: existingThread,
        },
      });
      return;
    }

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
      status: `ERROR ${err}`,
      message: 'Failed to create thread',
    });
  }
};

export default {
  getAllThreads,
  getUserThreads,
  createThread,
};
