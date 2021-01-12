import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController';
//import IUser from '../models/user';

const router = express.Router();

//router.get('/', userController.users_get);

router.post('/new', userController.user_create);
router.post('/login', userController.user_login);
/*router.get(
  '/protected',
  passport.authenticate('jwt', {session: false}),
  (_req, res) => {
    return res.send('yes');
  }
);*/
router.get(
  '/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    return res.json(req.user);
  }
);
router.get('/:id', userController.user_get);

export default router;
