import Comment from '../models/comment';
import {RequestHandler} from 'express';
import passport from 'passport';
import {body, validationResult} from 'express-validator';
import {Types} from 'mongoose';

const comments_get: RequestHandler = (req, res, next) => {
  Comment.find({post: req.params.id})
    .sort('-timestamp')
    .exec((err, foundComments) => {
      if (err) return next(err);
      return res.json(foundComments);
    });
};

const comment_post: RequestHandler[] = [
  body('content', 'Comment cannot be empty').trim().isLength({min: 1}).escape(),
  body('username').escape(),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.json(errs.array());
    const comment = new Comment({
      username: req.body.username ? req.body.username : 'Anonymous',
      content: req.body.content,
      post: (req.params.id as unknown) as Types.ObjectId,
    });
    comment.save((err, result) => {
      if (err) return next(err);
      return res.json(result);
    });
    return undefined;
  },
];

// PUT comment update
// DELETE comment delete

export default {comments_get, comment_post};
