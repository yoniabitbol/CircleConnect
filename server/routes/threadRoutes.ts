import express from 'express';
import threadController from '../controllers/threadController';

const router = express.Router();

router.route('/')
  .post(threadController.getUserThreads);

router.route('/:user_id')
  .get(threadController.getUserThreads);

export default router;
