import passport, { use } from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { findById } from '../models/User';
require('dotenv').config();

// Configuring a JWT authentication strategy with passport
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
    // Find a user in the database using the ID from the JWT payload
      const user = await findById(jwt_payload.user.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      console.error(err);
    }
  })
);

export default passport;
