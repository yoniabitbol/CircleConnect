import express from 'express';
import UserController from '../controllers/userController';
import uploadImages from '../middleware/multer';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUser);
router.patch('/', uploadImages, UserController.updateUser);
// router.route(':id');
// .delete(UserController.deleteUser);
// .get(UserController.getAllUsers)

export default router;
