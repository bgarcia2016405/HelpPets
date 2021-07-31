'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewSchema = Schema({
    newsDescription: String,
    pictures: String,
    stateNew: String,
    newDate: String,
    opinion: {
        si: Number,
        no: Number,
        ninguna: Number,
        usersComment: []
    },
    commentsList: [{
        commentDate: String,
        commentText: String,
        idUserComment: {type: Schema.Types.ObjectId, ref:'User'}
    }],
    newCreator: {type: Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('New', NewSchema);