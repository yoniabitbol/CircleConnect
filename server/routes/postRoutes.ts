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

router.route('/:post_id/like')
  .patch(postController.likePost);

router.route('/:post_id/comment')
  .patch(postController.commentPost);

router.route('/:user_id/feed')
  .get(postController.getFeed);

export default router;
