'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const userController = require("../controllers/user.controller");


var api = express.Router();

api.post('/createUser/:type', userController.createUser)

api.post('/Login', userController.Login)

api.get('/showAllUser' ,userController.showUser)

api.put('/compInfoVet', authenticated.ensureAuth, userController.compInfoVet);

api.put('/editVet', authenticated.ensureAuth, userController.editVet);

api.delete('/deleteVet', authenticated.ensureAuth, userController.deleteVet);

api.get('/getMyVet/:idUsuario', authenticated.ensureAuth, userController.getMyVet);

api.get('/getVets', authenticated.ensureAuth, userController.getVets);



module.exports = api;