'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const userController = require("../controllers/user.controller");


var api = express.Router();

api.post('/createUser/:type', userController.createUser)

api.post('/Login', userController.Login)


api.get('/mostrarAlbergue', userController.mostrarAlbergue)

api.get('/miAlbergue',authenticated.ensureAuth , userController.miAlbergue)

api.delete('/eliminarAlbergue/:idUser', authenticated.ensureAuth, userController.eliminarAlbergue)



api.post('/mostrarAlbergue', userController.mostrarAlbergue)

api.get('/mostrarUsuarios', authenticated.ensureAuth, userController.showUser)

api.put('/editarUsuario/:idUser', authenticated.ensureAuth, userController.editar)

api.delete('/eliminarUsuario/:idUser', authenticated.ensureAuth, userController.eliminar )

api.get('/mostrarUsuarioId/:idUser', authenticated.ensureAuth, userController.mostrarUsuarioId)

api.put('/compInfoVet', authenticated.ensureAuth, userController.compInfoVet);

api.put('/editVet', authenticated.ensureAuth, userController.editVet);

api.delete('/deleteVet', authenticated.ensureAuth, userController.deleteVet);

api.get('/getMyVet/:idUsuario', authenticated.ensureAuth, userController.getMyVet);

api.get('/getVets', authenticated.ensureAuth, userController.getVets);



module.exports = api;