import express from 'express';
import threadController from '../controllers/threadController';
import messageController from '../controllers/messageController';
import { resizeFile, uploadFiles } from '../middleware/multer';

const router = express.Router();

// Default route for threads
router.route('/')
  .get(threadController.getAllThreads)
  .post(threadController.createThread);

// Routes based on thread id
router.route('/:id/report')
  .patch(threadController.reportThread);

// Routes based on user id
router.route('/:user_id')
  .get(threadController.getUserThreads);

// Routes based on thread id
router.route('/:thread_id/messages')
  .get(messageController.getThreadMessages)
  .post(
    uploadFiles,
    resizeFile,
    messageController.createMessage,
  );

export default router;
