import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.route('/').get(UserController.getAllUsers).post(UserController.createUser).patch(UserController.updateUser);

router.route(':id').get(UserController.getUser)
  .delete(UserController.deleteUser);

export default router;
