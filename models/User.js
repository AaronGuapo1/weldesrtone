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

module.exports = User