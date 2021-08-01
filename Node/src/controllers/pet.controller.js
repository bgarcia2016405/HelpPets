'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const petModel = require("../models/pet.model")

const cuidando = 'cuidando'
const enEspera = 'enEspera'
const adoptado = 'adoptado'

function crearMascota(req, res){
    var idOrg = req.user.sub;
    var params = req.body;
    var PetModel = new petModel();

    if(req.user.type != 'albergue'){
        return res.status(500).send({mensaje: 'Solo los albergues pueden realizar esta accion'})
    }

    PetModel.name = params.name;
    PetModel.especie = params.especie;
    PetModel.organizacion = idOrg;
    PetModel.dueño = null;
    PetModel.picture = params.picture;
    PetModel.state = cuidando;

    petModel.findOne({name:PetModel.name , especie:PetModel.especie, organizacion:idOrg},(err,petFound)=>{
        if(err) return res.status(404).send({report:'Error al encontrar mascota'});
        if(petFound) return res.status(202).send({report:'Esta mascota ya existe'})

        PetModel.save((err,petSave)=>{
            if(err) return res.status(404).send({report:'Error al guardar mascota'});
            return res.status(200).send(petSave)
        })
    })
}

function mostrarMascotas(req, res){
    var idOrg = req.user.sub;

    petModel.find({organizacion:idOrg}, (err, petFound)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!petFound) return res.status(500).send({mensaje:'No se ha encontrado ninguna mascota'});

        return res.status(200).send(petFound)
    })
}

function mostrarMascotasUser(req, res){
    petModel.find({organizacion:req.params.idOrg}, (err, petFound)=>{
        if(err)  return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!petFound)return res.status(500).send({mensaje:'No se ha encontrado la mascota'});

        return res.status(200).send(petFound)
    })
}

function editarMascota(req, res){
    var idPet = req.params.idPet;
    var params = req.body;

    petModel.findByIdAndUpdate(idPet, params, {new: true},(err, petUpdate)=>{
        console.log(petUpdate)
        if(err) return res.status(500).send({ mensaje: 'Error en la petición'});
        if(!petUpdate) return res.status(500).send({mensaje: 'No se pudo actualizar la mascota'});

        return res.status(200).send({ petUpdate })
    })
}

function eliminarMascota(req, res) {
    var idPet = req.params.idPet;
  
    if(req.user.type != 'albergue'){
        return res.status(500).send({mensaje: 'Tu usuario no cumple con los requisitos necesarios'})
    }
  
    petModel.findByIdAndDelete(idPet,(err, mascotaDeleted)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!mascotaDeleted) return res.status(500).send({ mensaje: 'Error al eliminar esta mascota' });
  
        return res.status(200).send({ mascotaDeleted });
    })
  } 

function buscarMascotaID(req, res){
    var idPet = req.params.idPet;

    petModel.findById(idPet, (err, petFound)=>{
        if(err) return res.status(500).send({mensaje: 'Error'})
        if(!petFound) return res.status(500).send({mensaje: 'No se pudo encontrar ninguna mascota'})

        return res.status(200).send(petFound)
    })
}


module.exports ={
    crearMascota,
    mostrarMascotas,
    mostrarMascotasUser,
    editarMascota,
    eliminarMascota,
    buscarMascotaID
}