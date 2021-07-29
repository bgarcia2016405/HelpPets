'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const userController = require("../controllers/user.controller");


var api = express.Router();

api.post('/createUser/:type', userController.createUser)

api.post('/Login', userController.Login)


api.get('/mostrarAlbergue', userController.mostrarAlbergue)

api.get('/miAlbergue',authenticated.ensureAuth , userController.miAlbergue)


module.exports = api;