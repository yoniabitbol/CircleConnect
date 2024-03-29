import express from 'express';
import postController from '../controllers/postController';
import { uploadFiles, resizeFile } from '../middleware/multer';

const router = express.Router();

// Default route for posts
router.route('/')
  .get(postController.getAllPosts)
  .post(
    uploadFiles,
    resizeFile,
    postController.createPost,
  );
// Routes based on user id
router.route('/user/:user_id')
  .get(postController.getUserPosts);

// Routes based on post id
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

// Feed Routes
router.route('/:user_id/feed').get(postController.getSocialFeed);
router.route('/:user_id/jobFeed').get(postController.getJobFeed);

export default router;
