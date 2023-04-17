import express from 'express';
import notificationController from '../controllers/notificationController';

const router = express.Router();

// Notification API routes
router.route('/:user_id')
  .get(notificationController.getUserNotifications)
  .post(notificationController.sendNotification)
  .patch(notificationController.markAllNotifsRead);

// Unread notification API route (May be removed)
router.route('/:user_id/unread')
  .get(notificationController.getUnreadNotifications);

export default router;
