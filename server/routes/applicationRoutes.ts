import express from 'express';
import applicationController from '../controllers/applicationController';
import { uploadFiles, resizeFile } from '../middleware/multer';

const router = express.Router();

// Default route for applications
router.route('/')
  .get(applicationController.getAllApplications)
  .post(applicationController.createApplication);

// Routes based on application id
router.route('/:application_id')
  .get(applicationController.getApplication)
  .patch(applicationController.updateApplication)
  .delete(applicationController.deleteApplication);

// Routes based on post id
router.route('/:post_id/apply')
  .patch(
    uploadFiles,
    resizeFile,
    applicationController.sendApplication,
  );

router.route('/:application_id/withdraw')
  .patch(applicationController.withdrawApplication);

export default router;
