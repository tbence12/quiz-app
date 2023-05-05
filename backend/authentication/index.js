import passport from 'passport';
import expressSession from 'express-session';
import passportLocal from 'passport-local';
import userModel from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const USER_NOT_EXISTS = 'User does not exists'; 

export default (app) => {
  app.use(expressSession({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());
  
  const localStrategy = passportLocal.Strategy;

  passport.use('local', new localStrategy(async function(username, password, done) {
    try {
      const user = await userModel.findOne({username});

      if(!user) {
        return done(USER_NOT_EXISTS);
      }
      
      user.comparePasswords(password, function(error, isMatch) {
        if(!isMatch) {
          return done('Bad password', false);
        }
        if(error) {
          return done(error, false);
        }
        return done(null, user);
      })
    } catch (error) {
      return done('Error during user query');
    }
  }))
  
  passport.serializeUser(function(user, done) {
    if(!user) {
      return done(USER_NOT_EXISTS, null);
    }
    return done(null, user);
  })
  
  passport.deserializeUser(function(user, done) {
    if(!user) {
      return done(USER_NOT_EXISTS, null);
    }
    return done(null, user);
  })
}
