'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = Schema({
    name: String,
    especie: String,
    organizacion: {type: Schema.Types.ObjectId, ref:'User'},
    dueño: {type: Schema.Types.ObjectId, ref:'User'},
    picture: String,
    state: String
    
})

module.exports = mongoose.model('Pet', PetSchema);

