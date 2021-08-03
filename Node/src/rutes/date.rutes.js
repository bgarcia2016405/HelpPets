'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const dateController = require("../controllers/date.controller");

var api = express.Router();

api.post('/createDate', authenticated.ensureAuth, dateController.createDate);

api.get('/getService/:idVeterinaria', authenticated.ensureAuth, dateController.getService);

api.get('/getVeterinariaId/:idVeterinaria', authenticated.ensureAuth, dateController.getVeteriariaId);

api.get('/getMyDate', authenticated.ensureAuth, dateController.getMyDate)

api.get('/getDatesOrg/:idUser', authenticated.ensureAuth, dateController.getDatesOrg)

api.put('/editarDate/:idDate', authenticated.ensureAuth, dateController.editarDate)

api.get('/buscarIdDate/:idDate', authenticated.ensureAuth, dateController.buscarIdDate)


module.exports = api;