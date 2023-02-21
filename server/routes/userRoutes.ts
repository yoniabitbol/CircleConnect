import express from 'express';
import UserController from '../controllers/userController';
import { uploadImages, resizePhoto } from '../middleware/multer';

const router = express.Router();

// User Profile Routes
router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser)
  .patch(
    uploadImages,
    resizePhoto,
    UserController.updateUser,
  );

router
  .route('/:user_id')
  .get(UserController.getUser)
  .delete(UserController.deleteUser);

// User Connections Routes
router.route('/:user_id/connections').get(UserController.getUserConnections);
router.route('/:user_id/incoming').get(UserController.getIncomingRequests);
router.route('/:user_id/outgoing').get(UserController.getOutgoingRequests);
router.route('/:user_id/connect').patch(UserController.sendConnectionRequest);
router.route('/:user_id/accept').patch(UserController.acceptConnectionRequest);
router.route('/:user_id/decline').patch(UserController.declineConnectionRequest);
router.route('/:user_id/remove').patch(UserController.removeConnection);
router.route('/:user_id/cancel').patch(UserController.cancelConnectionRequest);

export default router;
