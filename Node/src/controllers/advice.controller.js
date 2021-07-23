'use strict'

var Advice = require('../models/advice.model');
const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const user = 'Usuario';
const admin = 'Administrador';

function createAdvice(req, res) {
    var params = req.body;
    var adviceModel = new Advice();

    if (params.advice) {
        adviceModel.advice = params.advice;
        adviceModel.adviceCreator = req.user.sub;
        adviceModel.picture = params.picture;
        adviceModel.title = params.title;
        adviceModel.resume = params.resume;

        Advice.find({
            $and: [
                { name: adviceModel.title },
                { user: adviceModel.adviceCreator }
            ]
        }).exec((err, adviceFound) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la petición' })

            if (adviceFound && adviceFound.length >= 1) {
                return res.status(500).send({ mensaje: 'El consejo ya existe' })
            } else {
                adviceModel.save((err, adviceSaved) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion del consejo' });
                    if (!adviceSaved) return res.status(500).send({ mensaje: 'Error al agregar el consejo' });

                    return res.status(200).send({ adviceSaved });
                })
            }
        }
        )
    } else {
        res.status(500).send({ mensaje: 'Rellene los datos necesarios para crear el consejo' });
    }
}

function getAdvices(req, res) {
    Advice.find((err, advicesFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de consejos' });
        if (!advicesFound) return res.status(500).send({ mensaje: 'Error al obtener los consejos' });
        return res.status(200).send({ advicesFound });
    })
} 

function getAdviceId(req, res) {
    var idAdvice = req.params.idAdvice;

    Advice.findById(idAdvice, (err, adviceFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición del consejos' })
        if (!adviceFound) return res.status(500).send({ mensaje: 'Error en obtener los datos' })
        return res.status(200).send({ adviceFound })
    })
}

function editAdvice(req, res) {
    var idAdvice = req.params.idAdvice;
    var params = req.body;

    Advice.findByIdAndUpdate(idAdvice,params, {new:true}, (err,adviceEdit)=>{
        if(err) return res.status(404).send({report:"Error in edit Advice"});
        if(!adviceEdit) return res.status(200).send({report:"Advice has not edit"});
            return res.status(200).send(adviceEdit)
    })
}

function deleteAdvice(req, res) {
    let idAdvice = req.params.idAdvice;

    Advice.findByIdAndRemove(idAdvice, (err, adviceDeleted) => {
        if (err) {
            return res.status(500).send({ message: 'Error general' })
        } else if (adviceDeleted) {
            return res.send({ message: 'Consejo eliminado', consejoDrop: adviceDeleted })
        } else {
            return res.status(404).send({ message: 'Consejo no encontrado o ya eliminado' })
        }
    })
}

module.exports = {
    createAdvice,
    getAdvices,
    getAdviceId,
    editAdvice,
    deleteAdvice
}