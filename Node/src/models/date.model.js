'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DateSchema = Schema({
    veterinaria: { type: Schema.Types.ObjectId, ref: 'User' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    state:String,
    date: String
})

module.exports = mongoose.model('Dates', DateSchema);