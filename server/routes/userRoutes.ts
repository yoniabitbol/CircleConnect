import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.route('/').get(UserController.getUser).post(UserController.createUser).patch(UserController.updateUser);

router.route(':id');
// .delete(UserController.deleteUser);
// .get(UserController.getAllUsers)

export default router;
