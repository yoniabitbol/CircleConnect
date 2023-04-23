import express from 'express';
import notificationController from '../controllers/notificationController';

const router = express.Router();

// Notification API routes
router.route('/:user_id')
  .get(notificationController.getUserNotifications)
  .post(notificationController.sendNotification)
  .patch(notificationController.markAllNotifsRead);

// Mark only messages as read
router.route('/:user_id/messages')
  .patch(notificationController.markMessagesRead);

// Unread notification API route
router.route('/:user_id/unread')
  .get(notificationController.getUnreadNotifications);

// Mark notification as read
router.route('/:id/read')
  .patch(notificationController.markNotificationRead);

export default router;
