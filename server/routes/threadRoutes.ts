import express from 'express';
import threadController from '../controllers/threadController';
import messageController from '../controllers/messageController';

const router = express.Router();

router.route('/')
  .get(threadController.getAllThreads)
  .post(threadController.createThread);

router.route('/:user_id')
  .get(threadController.getUserThreads);

router.route('/:thread_id/messages')
  .get(messageController.getThreadMessages)
  .post(messageController.createMessage);

export default router;
