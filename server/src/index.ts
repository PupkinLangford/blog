require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import mongoose from 'mongoose';

const mongoDB: string = process.env.MONGODB_URI as string;
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.connection.on(
  'error',
  console.error.bind(console, 'mongoose connection error')
);

const app = express();
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(cors());

app.get('/', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`now listening for requests on port ${process.env.SERVER_PORT}`);
});

export default app;
