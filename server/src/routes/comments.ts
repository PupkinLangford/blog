import express from 'express';
import commentController from '../controllers/commentController';

const router = express.Router({mergeParams: true});

router.get('/', commentController.comments_get);

router.post('/', commentController.comment_post);

export default router;
