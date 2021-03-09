require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../db/models/user');

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser');
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/filter',
  }, (accessToken, refreshToken, profile, done) => {
    console.log('GoogleStrategy');
    // check if user already exists in our own db
    User.findOne({ 'tokens.googleId': profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        // console.log('user is: ', currentUser)
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          'tokens.googleId': profile.id,
          login: profile.displayName,
        }).save().then((newUser) => {
          // console.log('created new user: ', newUser)
          done(null, newUser);
        });
      }
    });
  }),
);
