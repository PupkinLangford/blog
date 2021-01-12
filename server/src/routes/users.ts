import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController';

const router = express.Router();

//router.get('/', userController.users_get);

router.post('/new', userController.user_create);
router.post('/login', userController.user_login);
router.get(
  '/protected',
  passport.authenticate('jwt', {session: false}),
  (_req, res) => {
    return res.send('yes');
  }
);

export default router;
