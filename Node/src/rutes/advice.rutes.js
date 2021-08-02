'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const adviceController = require("../controllers/advice.controller");

var api = express.Router();

api.post('/createAdvice', authenticated.ensureAuth, adviceController.createAdvice);
api.get('/getAdvices', authenticated.ensureAuth, adviceController.getAdvices);
api.get('/getAdviceId/:idAdvice', authenticated.ensureAuth, adviceController.getAdviceId);
api.put('/editAdvice/:idAdvice', authenticated.ensureAuth, adviceController.editAdvice);
api.delete('/deleteAdvice/:idAdvice', authenticated.ensureAuth, adviceController.deleteAdvice);

module.exports = api;
    