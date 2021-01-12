import User from './models/user';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import user from './models/user';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new JwtStrategy(
  opts,
  (jwt_payload: {username: string}, done) => {
    User.findOne({username: jwt_payload.username}).exec((err, foundUser) => {
      if (err) return done(err, false);
      if (user) return done(null, foundUser);
      else return done(null, false);
    });
  }
);
