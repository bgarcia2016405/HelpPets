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
api.get('/getNew/:idNew', authenticated.ensureAuth, newController.getNew);
api.put('/editNew/:idNew', authenticated.ensureAuth, newController.editNew);
api.delete('/deleteNew/:idNew', authenticated.ensureAuth, newController.deleteNew);

module.exports = api;