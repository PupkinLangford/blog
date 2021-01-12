import User, {IUser} from '../models/user';
import Post from '../models/post';
import {RequestHandler} from 'express';
import passport from 'passport';
import {body, validationResult} from 'express-validator';

const posts_get: RequestHandler = (_req, res, next) => {
  Post.find({published: true})
    .populate('author', 'username')
    .exec((err, foundPosts) => {
      if (err) return next(err);
      return res.json(foundPosts);
    });
};

const post_get: RequestHandler = (req, res, next) => {
  Post.findOne({_id: req.params.id})
    .populate('author', 'username')
    .exec((err, foundPost) => {
      if (err) return next(err);
      if (!foundPost) return res.json({message: 'Post not found'});
      return res.json(foundPost);
    });
};

const post_create: RequestHandler[] = [
  passport.authenticate('jwt', {session: false}),
  body('title', 'Post must have title').trim().isLength({min: 1}).escape(),
  body('content', 'Post must not be empty').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.json(errs.array());
    if (!req.user) return res.json({message: 'User not found'});
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: (req.user as IUser)._id,
    });
    post.save(err => {
      if (err) return next(err);
      return res.json({message: 'Post uploaded'});
    });
    return undefined;
  },
];

//const post_update: RequestHandler[] = [];
//const post_delete: RequestHandler[] = [];
//const post_publish: RequestHandler[] = [];
//const post_unpublish: RequestHandler[] = [];

export default {posts_get, post_get, post_create};
