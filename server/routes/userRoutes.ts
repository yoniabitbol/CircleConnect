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

router.route('/connections/:user_id')
//   .get(UserController.getUserConnections)
  .put(UserController.sendConnectionRequest);

// router.route('/connections/:user_id/accept').put(UserController.acceptConnectionRequest);
// router.route('/connections/:user_id/decline').put(UserController.declineConnectionRequest);


export default router;
