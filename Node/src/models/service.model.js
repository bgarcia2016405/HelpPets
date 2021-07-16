'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = Schema({
    service: String,
    organizacion: {type: Schema.Types.ObjectId, ref:'User'},
    precio: Number
})

module.exports = mongoose.model('Service', ServiceSchema);

