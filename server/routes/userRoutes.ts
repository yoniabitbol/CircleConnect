import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.route('/').get(UserController.getAllUsers).post(UserController.createUser);

router.route(':id').get(UserController.getUser)
  .patch(UserController.updateUser).delete(UserController.deleteUser);

export default router;
