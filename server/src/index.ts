require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import jwtStrategy from './jwtStrategy';
import mongoose from 'mongoose';

import postRouter from './routes/posts';
import commentRouter from './routes/comments';
import userRouter from './routes/users';

const mongoDB: string = process.env.MONGODB_URI as string;
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.connection.on(
  'error',
  console.error.bind(console, 'mongoose connection error')
);

const app = express();
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
passport.use(jwtStrategy);

app.use(cors());

app.get('/', (_req, res) => {
  res.redirect('/api/posts');
});

app.get('/api', (_req, res) => {
  res.redirect('/api/posts');
});

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/posts/:id/comments', commentRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`now listening for requests on port ${process.env.SERVER_PORT}`);
});
