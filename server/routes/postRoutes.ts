import express from 'express';
import postController from '../controllers/postController';

const router = express.Router();

router.route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router.route('/:post_id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

export default router;
