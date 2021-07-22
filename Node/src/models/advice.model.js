'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdviceSchema = Schema({
    advice: String,
    picture: String,
    adviceCreator: {type: Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('Advice', AdviceSchema);