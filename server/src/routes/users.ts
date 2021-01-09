import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.users_get);

router.post('/new', userController.user_create);
router.post('/login', userController.user_login);

export default router;
