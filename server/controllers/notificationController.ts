import { Request, Response } from 'express';
import Notification from '../models/notificationModel';

const getUnreadNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({
      user_id: req.params.user_id,
      isRead: false,
    }).populate('initiator', 'name picture');
    res.status(200).json({
      status: 'success',
      data: {
        notifications,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Failed to get unread notifications',
    });
  }
};

const sendNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.create({
      user_id: req.params.user_id,
      type: req.body.type,
      initiatorID: req.body.initiatorID,
    });
    res.status(201).json({
      status: 'success',
      data: {
        notification,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Failed to send notification',
    });
  }
};

const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { user_id: req.params.user_id },
      { isRead: true },
    );
    res.status(200).json({
      status: 'success',
      data: {
        notification,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Failed to mark notification as read',
    });
  }
};

export default {
  getUnreadNotifications,
  sendNotification,
  markNotificationAsRead,
};
