'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const userController = require("../controllers/user.controller");


var api = express.Router();

api.post('/createUser/:type', userController.createUser)

api.post('/Login', userController.Login)


api.get('/mostrarAlbergue', userController.mostrarAlbergue)

api.get('/miAlbergue',authenticated.ensureAuth , userController.miAlbergue)


api.post('/mostrarAlbergue', userController.mostrarAlbergue)

api.get('/mostrarUsuarios', authenticated.ensureAuth, userController.showUser)

api.put('/editarUsuario/:idUser', authenticated.ensureAuth, userController.editar)

api.delete('/eliminarUsuario/:idUser', authenticated.ensureAuth, userController.eliminar )

api.get('/mostrarUsuarioId/:idUser', authenticated.ensureAuth, userController.mostrarUsuarioId)

module.exports = api;