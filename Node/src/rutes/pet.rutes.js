'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const petController = require("../controllers/pet.controller");

var api = express.Router();

api.post('/crearMascota', authenticated.ensureAuth, petController.crearMascota)

api.get('/mostrarMascotas', authenticated.ensureAuth, petController.mostrarMascotas)

api.get('/mostrarMascotasUser/:idOrg', petController.mostrarMascotasUser)

api.get('/mostrarMascotaId/:idMascota', petController.mostrarMascotaId)

api.put('/editarMascota/:idPet', authenticated.ensureAuth, petController.editarMascota)

api.put('/adoptarMascota/:idMascota', authenticated.ensureAuth, petController.adoptarMascota)

module.exports = api;