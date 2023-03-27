require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const mongoosePaginate= require('mongoose-paginate-v2')


// -------------- SCHEMA -------------- //
const userSchema = new Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    microsftId: String,
    role: String,
    fullName: String,
    tel: String,
    verificationCode: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
userSchema.plugin(mongoosePaginate);

// -------------- MODEL -------------- //
const User = mongoose.model("User", userSchema);

module.exports = User