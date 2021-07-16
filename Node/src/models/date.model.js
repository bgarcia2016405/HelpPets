'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DateSchema = Schema({
    pet: {type: Schema.Types.ObjectId, ref:'Pet'},
    service: {type: Schema.Types.ObjectId, ref:'Service'},
    date: String
})

module.exports = mongoose.model('Dates', DateSchema);

