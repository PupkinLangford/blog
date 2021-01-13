import express from 'express';
import commentController from '../controllers/commentController';

const router = express.Router({mergeParams: true});

router.get('/', commentController.comments_get);

router.post('/', commentController.comment_post);

router.get('/:comment_id', commentController.comment_get);

router.delete('/:comment_id', commentController.comment_delete);

export default router;
