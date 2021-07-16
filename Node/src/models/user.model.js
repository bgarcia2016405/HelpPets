'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nameUser: String,
    lastNameUser: String,
    nickName: String,
    ageUser: String, 
    email: String,
    picture: String,
    password: String,
    type: String,
    org: {
        nameOrg: String,
        pictureOrg: String,
        direction: String,
        type:String
    }
})

module.exports = mongoose.model('User', UserSchema);

