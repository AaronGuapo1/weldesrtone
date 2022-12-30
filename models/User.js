const mongoose = require('mongoose');
const { Schema } = mongoose;
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

// -------------- SCHEMA -------------- //
const userSchema = new Schema({
    email: String,
    password: String,
    googleId: String,
    role: String
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

// // - Google OAuth
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/welderstone"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

module.exports = User