require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const MicrosoftStrategy = require('passport-microsoft').Strategy;


// -------------- SCHEMA -------------- //
const userSchema = new Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    microsftId: String,
    role: String,
    verificationCode: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
    
// -------------- MODEL -------------- //
const User = mongoose.model("User", userSchema);

// -------------- USER CONFIG -------------- //
passport.use(User.createStrategy());
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        role: user.role,
        picture: user.picture
      });
    });
});  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

// - Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/welderstone"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, async function (err, user) {
      if(user?.role == undefined){
        await User.updateMany({googleId: user.googleId}, {username: profile.displayName, role: "costumer"});
      }

      return cb(err, user);
    });
  }
));

// - Facebook OAuth
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/welderstone"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, async function (err, user) {
    if(user?.role == undefined){
      await User.updateMany({facebookId: profile.id}, {username: profile.displayName, role: "costumer"});
    }

    return cb(err, user);
  });
}
));

passport.use(new MicrosoftStrategy({
  // Standard OAuth2 options
  clientID: process.env.MICROSOFT_APP_ID,
  clientSecret: process.env.MICROSOFT_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/microsoft/welderstone",
  scope: ['user.read'],

  // Microsoft specific options

  // [Optional] The tenant for the application. Defaults to 'common'. 
  // Used to construct the authorizationURL and tokenURL
  tenant: 'common',

  // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
  authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',

  // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
  tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ microsftId: profile.id }, async function (err, user) {
    if(user?.role == undefined){
      await User.updateMany({facebookId: profile.id}, {username: profile.displayName, role: "costumer"});
    }
    return done(err, user);
  });
}
));

module.exports = User