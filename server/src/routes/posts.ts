import express from 'express';
import postController from '../controllers/postController';

const router = express.Router();

router.get('/', postController.posts_get);
router.get('/all', postController.posts_get_all);
router.post('/', postController.post_create);
router.get('/:id', postController.post_get);
router.put('/:id', postController.post_update);
router.post('/:id', postController.post_publish);
router.delete('/:id', postController.post_delete);

export default router;
