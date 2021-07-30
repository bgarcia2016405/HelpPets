'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const newController = require("../controllers/new.controller");

var api = express.Router();

api.post('/createNew', authenticated.ensureAuth, newController.createNew);
api.get('/getNews', authenticated.ensureAuth, newController.getNews);
api.put('/addCommentNew/:idNew', authenticated.ensureAuth, newController.addCommentNew);
api.put('/editCommentNew/:idNew/:idComment', authenticated.ensureAuth, newController.editCommentNew);
api.get('/getComment/:idNew/:idComment', authenticated.ensureAuth, newController.getComment);
api.delete('/deleteComment/:idComment', authenticated.ensureAuth, newController.deleteComment);
api.get('/getNewId/:idNew', authenticated.ensureAuth, newController.getNew);

module.exports = api;