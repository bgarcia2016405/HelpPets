'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const dateModel = require("../models/date.model");
const veterinariaModel = require("../models/user.model")
const serviceModel = require("../models/service.model")

const reservado = 'reservado';
const cancelado = 'cancelado';
const servido = 'termida';

function createDate(req, res) {

    var veterinaria = req.params.veterinaria
    var idUser = req.user.sub;
    var params = req.body;
    var DateModel = new dateModel();

    if (req.user.type != 'dueño') {
        return res.status(404).send({ mensaje: 'Solo los dueños pueden realizar esta accion' })
    }

   
    DateModel.user = idUser;
    DateModel.service = params.service;
    DateModel.date = params.date;
    DateModel.state = reservado; 
    DateModel.veterinaria = params.veterinaria
    dateModel.find({
        $or: [
            { date: DateModel.date }
        ]
    }).exec((err, dateFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la fecha' })

        if (dateFound && dateFound.length >= 5) {
            return res.status(500).send({ mensaje: 'Se a superado el limite de citas para esta fecha' })
        } else {

            DateModel.save((err, dateSaved) => {
                if (err) return res.status(404).send({ mensaje: 'Error al guardar la cita' });

                if (dateSaved) {
                    res.status(200).send(dateSaved)
                } else {
                    res.status(404).send({ mensaje: 'No se a podido guardar la cita' })
                }

            })

        }
    })

}


function getService(req, res) {
    var idVet = req.params.idVeterinaria;

    serviceModel.find({ organizacion: idVet }, (err, serviceFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!serviceFound) return res.status(500).send({ mensaje: 'Erro al obtener los servicios' });
        return res.status(200).send(serviceFound)
    })

}

function getVeteriariaId(req, res) {
    var idVet = req.params.idVeterinaria;

    veterinariaModel.find({ _id: idVet }, (err, vetFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!vetFound) return res.status(500).send({ mensaje: 'Erro al obtener la veterinaria' });
        return res.status(200).send(vetFound)
    })

}

function getMyDate(req,res){
  var idUser = req.user.sub;

  dateModel.find({user:idUser}, (err,dateFound)=>{
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
    if (!dateFound) return res.status(500).send({ mensaje: 'Erro al obtener la citas' });
    return res.status(200).send(dateFound)
  }).populate('service veterinaria')
}

function getDatesOrg(req,res){
  var idUser = req.params.idUser;

  if (req.user.type != 'veterinaria') {
    return res.status(404).send({ mensaje: 'Solo las veterianarias pueden realizar esta accion' })
}

  dateModel.findById(idUser,(err,dateFound)=>{
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
    if (!dateFound) return res.status(500).send({ mensaje: 'Erro al obtener la citas' });
    return res.status(200).send(dateFound)
  })
}

function editarDate(req,res){
  var idDate = req.params.idDate;
  var params = req.body;

  dateModel.findByIdAndUpdate(idDate,params,(err,dateEdit)=>{
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
    if (!dateEdit) return res.status(500).send({ mensaje: 'Erro en editar ' });
    return res.status(200).send(dateEdit)
  })
}

function buscarIdDate(req,res){
  var idDate = req.params.idDate;

  dateModel.findById(idDate,(err,dateFound)=>{
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
    if (!dateFound) return res.status(500).send({ mensaje: 'Erro en buscar ' });
    return res.status(200).send(dateFound)
  })
}

module.exports = {
    createDate,
    getService,
    getVeteriariaId,
    getMyDate,
    getDatesOrg,
    editarDate,
    buscarIdDate
}