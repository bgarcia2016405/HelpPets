'use strict'


const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")







app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// CABECERAS
app.use(cors());

// CARGA DE RUTAS



module.exports = app;