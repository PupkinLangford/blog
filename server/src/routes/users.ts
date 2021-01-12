import express from 'express';
import userController from '../controllers/userController';
//import IUser from '../models/user';

const router = express.Router();

//router.get('/', userController.users_get);

router.post('/', userController.user_create);
router.post('/login', userController.user_login);

/*router.get(
  '/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    return res.json(req.user);
  }
);*/
router.get('/:id', userController.user_get);

export default router;
