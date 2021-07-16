'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RescueSchema = Schema({
    usuario: {type: Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('Rescue', RescueSchema);

