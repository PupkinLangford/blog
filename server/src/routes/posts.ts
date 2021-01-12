import express from 'express';
import postController from '../controllers/postController';

const router = express.Router();

router.get('/', postController.posts_get);
router.post('/new', postController.post_create);
router.get('/:id', postController.post_get);

export default router;
