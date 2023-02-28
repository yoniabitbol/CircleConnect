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

export default router;
