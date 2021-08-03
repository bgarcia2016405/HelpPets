'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DateSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    date: String
})

module.exports = mongoose.model('Dates', DateSchema);