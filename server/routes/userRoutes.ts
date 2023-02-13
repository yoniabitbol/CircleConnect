import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

// User Profile Routes
router.route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser)
  .patch(UserController.updateUser);

router.route('/:user_id')
  .get(UserController.getUser)
  .delete(UserController.deleteUser);

// User Connections Routes
router.route('/:user_id/connections').get(UserController.getUserConnections);
router.route('/:user_id/incoming').get(UserController.getIncomingRequests);
router.route('/:user_id/outgoing').get(UserController.getOutgoingRequests);
router.route('/:user_id/connect').put(UserController.sendConnectionRequest);
router.route('/:user_id/accept').put(UserController.acceptConnectionRequest);
router.route('/:user_id/decline').put(UserController.declineConnectionRequest);
router.route('/:user_id/remove').put(UserController.removeConnection);

export default router;
