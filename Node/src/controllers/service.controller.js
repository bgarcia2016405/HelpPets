'use strict'

var Service = require("../models/service.model");

function createService(req, res) {
    var params = req.body;
    var serviceModel = new Service();

    if (params.service && params.precio) {
        serviceModel.service = params.service;
        serviceModel.organizacion = req.user.sub;
        serviceModel.precio = params.precio;

        serviceModel.save((err, serviceSaved) => {
            if (err) return res.status(500).send({ mensaje: 'Error saving the service' });
            if (!serviceSaved) return res.status(500).send({ mensaje: 'Service was not saved' });

            return res.status(200).send({ serviceSaved });
        })
    } else {
        res.status(500).send({ mensaje: 'Fill the spaces' });
    }
}

function editService(req, res) {
    var idService = req.params.idService;
    var params = req.body;

    Service.findByIdAndUpdate(idService, params, { new: true }, (err, serviceEdited) => {
        if (err) return res.status(500).send({ mensaje: 'Error editing the service' });
        if (!serviceEdited) return res.status(500).send({ mensaje: 'Service was not edited' });
        return res.status(200).send({ serviceEdited });
    })
}

function deleteService(req, res) {
    var idService = req.params.idService;

    Service.findByIdAndDelete(idService, (err, serviceDeleted)=>{
        if(err) return res.status(400).send({mensaje: 'Error deleting service'});
        if(!serviceDeleted) return res.status(400).send({mensaje: 'Service was not deleted'});
        return res.status(200).send(serviceDeleted)
    })
}

function getMyServices(req, res) {
    //Encuesta.find({ titulo: { $regex: 'encuesta', $options: 'i' } }, { listaComentarios: 0})
    Service.find({organizacion: req.user.sub}, (err, vetsFound)=>{
      if(err) return res.status(500).send({mensaje: 'Error getting vets'});
      if(!vetsFound) return res.status(500).send({mensaje: 'Vets were not brought'});
      return res.status(200).send(vetsFound)
    })
  
}

function getServices(req, res) {
    var idVet = req.params.idVet;
    //Encuesta.find({ titulo: { $regex: 'encuesta', $options: 'i' } }, { listaComentarios: 0})
    Service.find({organizacion: idVet}, (err, vetsFound)=>{
      if(err) return res.status(500).send({mensaje: 'Error getting vets'});
      if(!vetsFound) return res.status(500).send({mensaje: 'Vets were not brought'});
      return res.status(200).send(vetsFound)
    })
  
}


module.exports={
    createService,
    editService,
    deleteService,
    getMyServices,
    getServices
}