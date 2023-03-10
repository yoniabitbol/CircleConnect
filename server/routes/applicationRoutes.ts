import express from 'express';
import applicationController from '../controllers/applicationController';
import { uploadFiles, resizeFile } from '../middleware/multer';

const router = express.Router();

// potentially remove these routes later
router.route('/')
  .get(applicationController.getAllApplications)
  .post(applicationController.createApplication);

router.route('/:application_id')
  .get(applicationController.getApplication)
  .patch(applicationController.updateApplication)
  .delete(applicationController.deleteApplication);

// Send files here?
router.route('/:post_id/apply')
  .patch(
    uploadFiles,
    resizeFile,
    applicationController.sendApplication,
  );

router.route('/:application_id/withdraw')
  .patch(applicationController.withdrawApplication);

export default router;
