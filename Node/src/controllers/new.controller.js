'use strict'

var New = require('../models/new.model');
var mongoose = require('mongoose')

function createNew(req, res) {
    var params = req.body;
    var newModel = new New();
    
    var todayDate = new Date();
    var actualDate = todayDate.toLocaleDateString();
    
    if(params.newsDescription){
        newModel.newsDescription = params.newsDescription;
        newModel.pictures = params.pictures;
        newModel.stateNew = 'Perdido';
        newModel.newDate = actualDate

        newModel.opinion = {
            si: 0,
            no:0,
            ninguna:0,
            usersComment: []
        };
        newModel.newCreator = req.user.sub;

        newModel.save((err, newSave)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la Noticia' });
            if(!newSave) return res.status(500).send({ mensaje: 'Error al agregar la Noticia' });

            return res.status(200).send({ newSave });
        })
    }else{
        res.status(500).send({
            mensaje: 'Rellene los datos necesarios para crear la Noticia'
        });
    }
}

function getNews(req, res) {
    New.find().populate('newCreator','nickName picture').exec((err, newsFound)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de noticias' });
        if(!newsFound) return res.status(500).send({ mensaje: 'Error al obtener las noticias' });
        return res.status(200).send({ newsFound });
    })
}

function addCommentNew(req, res) {
    var newID = req.params.idNew;
    var params = req.body;

    New.findByIdAndUpdate(newID, { $push: { commentsList: { commentText: params.commentText, idUserComment: req.user.sub } } },
        {new: true}, (err, commentAdded)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del comentario' });
            if(!commentAdded) return res.status(500).send({ mensaje: 'Error al agregar el comentario a la noticia' });
            return res.status(200).send({ commentAdded });
        })
}

function editCommentNew(req, res) {
    var newId = req.params.idNew;
    var commentId = req.params.idComment;
    var params = req.body;
   
    New.findOneAndUpdate({ _id: newId, "commentsList._id": commentId, 'commentsList.idUserComment': req.user.sub }, 
    { "commentsList.$.commentText": params.commentText }, {new: true, useFindAndModify: false}, (err, commentEdited)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Comentario' });
        if(!comentarioEditado) return res.status(500).send({ mensaje: 'No posee los permisos para editar este comentario' });
        return res.status(200).send( {commentEdited} )
    })
}

function getComment(req, res) {
    var newId = req.params.idNew;
    var commentId = req.params.idComment;

    New.findOne({ _id: newId, "commentsList._id": commentId }, { "commentsList.$": 1, newsDescription: 1, idUserComment:1 }, (err, commentFound)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Noticias' });
        if(!commentFound) return res.status(500).send({ mensaje: 'Error al obtener el comentario' });
        return res.status(200).send({ commentFound })
    })
}

function deleteComment(req, res) {
    var commentId = req.params.idComment;
   
    New.findOneAndUpdate({ "commentsList._id" : commentId}, { $pull: { commentsList : { _id: commentId } } },
    {new: true, useFindAndModify: false},(err, commentDeleted)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de Comentario'});
        if(!commentDeleted) return res.status(500).send({ mensaje: 'Error al eliminar el Comentario' });

        return res.status(200).send({ commentDeleted })
    })
}

function getNew(req, res) {
    var idNew = req.params.idNew;

    New.findById(idNew).populate('newCreator', 'nickName  pictures').exec((err, newFound)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Noticia'});
        if(!newFound) return res.status(500).send({ mensaje: 'Error al obtener la Noticia'});
        return res.status(200).send({ newFound })
    })
}

function editNew(req, res) {
    var idNew = req.params.idNew;
    var params = req.body;

    New.findByIdAndUpdate(idNew,params, {new:true}, (err,newEdit)=>{
        if(err) return res.status(404).send({report:"Error in edit Advice"});
        if(!newEdit) return res.status(200).send({report:"Advice has not edit"});
            return res.status(200).send(newEdit)
    })
}

function deleteNew(req, res) {
    let idNew = req.params.idNew;

    New.findByIdAndRemove(idNew, (err, newDeleted) => {
        if (err) {
            return res.status(500).send({ message: 'Error general' })
        } else if (newDeleted) {
            return res.send({ message: 'Noticia eliminada', noticiaDrop: newDeleted })
        } else {
            return res.status(404).send({ message: 'Noticia no encontrada o ya eliminada' })
        }
    })
}

module.exports = {
    createNew,
    getNews,
    addCommentNew,
    editCommentNew,
    getComment,
    deleteComment,
    getNew,
    editNew,
    deleteNew
}


/*
Fuente utilizada para lo de la fecha:
  https://www.freecodecamp.org/espanol/news/javascript-date-now-como-obtener-la-fecha-actual-con-javascript/
*/