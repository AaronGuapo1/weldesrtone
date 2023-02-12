require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

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