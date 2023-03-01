import express from 'express';
import postController from '../controllers/postController';
import { uploadFiles, resizeFile } from '../middleware/multer';

const router = express.Router();

router.route('/')
  .get(postController.getAllPosts)
  .post(
    uploadFiles,
    resizeFile,
    postController.createPost,
  );

router.route('/:post_id')
  .get(postController.getPost)
  .patch(
    uploadFiles,
    resizeFile,
    postController.updatePost,
  )
  .delete(postController.deletePost);

router.route('/:post_id/like')
  .patch(postController.likePost);

router.route('/:post_id/comment')
  .patch(postController.commentPost);

router.route('/:user_id/feed')
  .get(postController.getFeed);

export default router;
