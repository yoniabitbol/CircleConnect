import { Request, Response } from 'express';
import Thread from '../models/threadModel';
import Message from '../models/messageModel';

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

const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.create({
      senderID: req.body.senderID,
      threadID: req.params.thread_id,
      text: req.body.text,
      file: req.body.file,
    });
    await Thread.findOneAndUpdate(message.threadID, {
      $push: { messages: message._id },
    });

    // // Get recipient user ID(s)
    // const thread = await Thread.findById(req.params.thread_id);
    // const recipientIDs = thread?.participants.filter((id) => id !== req.body.senderID);
    //
    // // Emit message to recipient(s)
    // recipientIDs?.forEach((id) => {
    //   const socketID = userSocketMap.get(id);
    //   if (socketID) {
    //     io.to(socketID).emit('message', message);
    //   }
    // });

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
