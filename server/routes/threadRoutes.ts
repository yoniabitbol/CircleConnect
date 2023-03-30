import express from 'express';
import threadController from '../controllers/threadController';
import messageController from '../controllers/messageController';

const router = express.Router();

// Default route for threads
router.route('/')
  .get(threadController.getAllThreads)
  .post(threadController.createThread);

// Routes based on user id
router.route('/:user_id')
  .get(threadController.getUserThreads);

// Routes based on thread id
router.route('/:thread_id/messages')
  .get(messageController.getThreadMessages)
  .post(messageController.createMessage);

export default router;
