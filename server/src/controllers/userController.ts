import User from '../models/user';
import Post from '../models/post';
import {RequestHandler} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/*const users_get: RequestHandler = (_req, res, next) => {
  User.find({}).exec((err, users) => {
    if (err) {
      return next(err);
    }
    return res.json(users);
  });
};*/

const user_create: RequestHandler = (req, res, next) => {
  // Need to have validation

  const username = (req.body.username as string).toLowerCase();
  const password = req.body.password as string;
  const key = req.body.key as string;

  User.findOne({username: username}).exec((err, foundUser) => {
    if (err) {
      return next(err);
    }
    if (key !== process.env.SIGNUP_KEY) {
      return res.json({message: 'Key incorrect'});
    }
    if (foundUser) {
      return res.json({message: 'Username already exists'});
    }
    bcrypt.hash(password, 10, (err, hashedWord) => {
      if (err) {
        return next(err);
      }
      const user = new User({username: username, password: hashedWord});
      user.save(err => {
        if (err) {
          return next(err);
        }
        const opts = {expiresIn: 3600};
        const token = jwt.sign(
          {username},
          process.env.JWT_SECRET as string,
          opts
        );
        return res.status(200).json({message: 'Sign up successful', token});
      });
    });
  });
};

const user_login: RequestHandler = (req, res, next) => {
  const username = (req.body.username as string).toLowerCase();
  const password = req.body.password as string;

  User.findOne({username: username}).exec((err, foundUser) => {
    if (err) {
      return next(err);
    }
    if (!foundUser) {
      return res.json({message: 'username or password incorrect'});
    }
    bcrypt.compare(password, foundUser.password, (err, same) => {
      if (err) {
        return next(err);
      }
      if (!same) {
        return res.json({message: 'username or password incorrect'});
      }
      const opts = {expiresIn: 3600};
      const token = jwt.sign(
        {username},
        process.env.JWT_SECRET as string,
        opts
      );
      return res.status(200).json({message: 'login successful', token});
    });
  });
};

const user_get: RequestHandler = (req, res, next) => {
  User.findOne({_id: req.params.id}).exec((err, foundUser) => {
    if (err) {
      return next(err);
    }
    if (!foundUser) {
      return res.json({message: 'user not found'});
    }
    Post.find({author: req.params.id, published: true}).exec(
      (err, foundPosts) => {
        if (err) return next(err);
        return res.json({username: foundUser.username, posts: foundPosts});
      }
    );
  });
};

export default {user_create, user_login, user_get};
