import { Request, Response } from 'express';
import Notification from '../models/notificationModel';

// Gets all notifications specific to a user
const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({
      user_id: req.params.user_id,
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
      message: 'Failed to get user notifications',
    });
  }
};

// Gets all unread notifications specific to a user
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

// Sends a notification to a user
const sendNotification = async (req: Request, res: Response) => {
  try {
    if (
      req.body.type !== 'message'
        && req.body.type !== 'connection'
        && req.body.type !== 'relatedPost'
    ) {
      return res.status(400).json({
        status: 'failure',
        message: 'Invalid notification type',
      });
    }
    const notification = await Notification.create({
      user_id: req.params.user_id,
      type: req.body.type,
      initiatorID: req.body.initiatorID,
    });
    return res.status(201).json({
      status: 'success',
      data: {
        notification,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Failed to send notification',
    });
  }
};

// Marks all of a user's notifications as read
const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.updateMany(
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
  getUserNotifications,
  getUnreadNotifications,
  sendNotification,
  markNotificationAsRead,
};
