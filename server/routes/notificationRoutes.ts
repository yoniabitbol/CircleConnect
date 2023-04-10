import express from 'express';
import notificationController from '../controllers/notificationController';

const router = express.Router();

// Notification API routes
router.route('/:user_id')
  .get(notificationController.getUnreadNotifications)
  .post(notificationController.sendNotification)
  .patch(notificationController.markNotificationAsRead);

export default router;
