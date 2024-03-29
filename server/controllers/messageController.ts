import { Request, Response } from 'express';
import Thread from '../models/threadModel';
import Message from '../models/messageModel';

// Fetches all messages in a thread
const getThreadMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({
      threadID: req.params.thread_id,
    }).populate('sender', 'name picture');
    res.status(200).json({
      status: 'success',
      data: {
        messages,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: `ERROR ${err}`,
      message: 'Failed to get thread messages',
    });
  }
};

// Creates a message in a thread
const createMessage = async (req: any, res: Response) => {
  try {
    const message = await Message.create({
      senderID: req.body.senderID,
      threadID: req.params.thread_id,
      text: req.body.text,
      file: req.files && req.files.messageFile ? req.files.messageFile[0].filename : req.body.image,
    });
    await Thread.findOneAndUpdate(message.threadID, {
      $push: { messages: message._id },
    });

    res.status(201).json({
      status: 'success',
      data: {
        message,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Failed to create message',
    });
  }
};

export default {
  getThreadMessages,
  createMessage,
};
