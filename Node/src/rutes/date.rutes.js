'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const dateController = require("../controllers/date.controller");

var api = express.Router();

api.post('/createDate', authenticated.ensureAuth, dateController.createDate);

api.get('/getService/:idVeterinaria', authenticated.ensureAuth, dateController.getService);

api.get('/getVeterinariaId/:idVeterinaria', authenticated.ensureAuth, dateController.getVeteriariaId);

module.exports = api;