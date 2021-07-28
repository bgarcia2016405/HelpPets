'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const userController = require("../controllers/user.controller");


var api = express.Router();

api.post('/createUser/:type', userController.createUser)

api.post('/Login', userController.Login)

api.post('/mostrarAlbergue', userController.mostrarAlbergue)

api.post('/mostrarAlbergue', userController.mostrarAlbergue)

api.get('/mostrarUsuarios', authenticated.ensureAuth, userController.showUser)

module.exports = api;