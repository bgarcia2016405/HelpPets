'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const serviceController = require("../controllers/service.controller");
const serviceModel = require("../models/service.model");

var api = express.Router();

api.post('/createService', authenticated.ensureAuth, serviceController.createService);
api.put('/editService/:idService', authenticated.ensureAuth, serviceController.editService);
api.delete('/deleteService/:idService', authenticated.ensureAuth, serviceController.deleteService);
api.get('/getMyServices', authenticated.ensureAuth, serviceController.getMyServices);
api.get('/getServices/:idVet', authenticated.ensureAuth, serviceController.getServices);


module.exports = api;