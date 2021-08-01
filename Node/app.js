'use strict'


const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")


const user_rutes = require("./src/rutes/user.rutes");
const service_routes = require("./src/rutes/service.routes");
const pet_rutes = require("./src/rutes/pet.rutes");
const advice_rutes = require("./src/rutes/advice.rutes");
const new_rutes = require("./src/rutes/new.rutes");




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// CABECERAS
app.use(cors());

// CARGA DE RUTAS
app.use('/api', user_rutes,
               service_routes,
               pet_rutes,
               advice_rutes,
               new_rutes);


module.exports = app;