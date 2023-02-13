import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.route('/')
  .get(UserController.getUser)
  .post(UserController.createUser)
  .patch(UserController.updateUser);

router.route(':id');
// .delete(UserController.deleteUser);
// .get(UserController.getAllUsers)

// TODO: Implement these routes

router.route('/:user_id/connections').get(UserController.getUserConnections);
router.route('/connections/:user_id/incoming').get(UserController.getIncomingRequests);
router.route('/connections/:user_id/outgoing').get(UserController.getOutgoingRequests);
router.route('/connections/:user_id/connect').put(UserController.sendConnectionRequest);
router.route('/connections/:user_id/accept').put(UserController.acceptConnectionRequest);
router.route('/connections/:user_id/decline').put(UserController.declineConnectionRequest);
router.route('/connections/:user_id/remove').put(UserController.removeConnection);

export default router;
