'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewSchema = Schema({
    newsDescription: String,
    pictures: String,
    newCreator: {type: Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('New', NewSchema);

