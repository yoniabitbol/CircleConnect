import express from 'express';
import applicationController from '../controllers/applicationController';

const router = express.Router();

router.route('/')
  .get(applicationController.getAllApplications)
  .post(applicationController.createApplication);

router.route('/:application_id')
  .get(applicationController.getApplication)
  .patch(applicationController.updateApplication)
  .delete(applicationController.deleteApplication);

// applications based on post
// Send files here?
router.route('/:post_id/apply')
  .patch(applicationController.sendApplication);

router.route('/:application_id/withdraw')
  .patch(applicationController.withdrawApplication);

// applications based on post
router.route('/:post_id/applications')
  .get(applicationController.getPostApplications);

// applications based on user
router.route('/:user_id/applications')
  .get(applicationController.getUserApplications);

export default router;
