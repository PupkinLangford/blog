import Comment from '../models/comment';
import Post from '../models/post';
import {IUser} from '../models/user';
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

const comment_get: RequestHandler = (req, res, next) => {
  Comment.findById(req.params.comment_id).exec((err, foundComment) => {
    if (err) return next(err);
    if (!foundComment) return res.json({message: 'Comment not found'});
    return res.json(foundComment);
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

const comment_delete: RequestHandler[] = [
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    if (!req.user) return res.json({message: 'User not found'});
    Comment.findById(req.params.comment_id).exec((err, foundComment) => {
      if (err) return next(err);
      if (!foundComment) return res.json({message: 'Comment not found'});
      Post.findById(foundComment.post).exec((err, foundPost) => {
        if (err) return next(err);
        if (!foundPost) return next(err);
        if (foundPost.author.toString() !== (req.user as IUser)._id.toString())
          return res.json({message: 'Unauthorized User'});
        Comment.findByIdAndDelete(req.params.comment_id).exec((err, result) => {
          if (err) return next(err);
          return res.json(result);
        });
      });
    });
    return undefined;
  },
];

export default {comments_get, comment_get, comment_post, comment_delete};
