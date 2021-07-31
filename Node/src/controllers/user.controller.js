'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");
const Service = require("../models/service.model");

const administrador ='Administrador'
const usuario = 'dueño';
const Albergue = 'albergue';
const Veterinario = 'veterinaria';

function Login(req, res) {
  var params = req.body;

  userModel.findOne({ nickName: params.nickName }, (err, userFound) => {
    if (err) return res.status(404).send({ report: 'Error at Login' });

    if (!userFound) return res.status(404).send({ report: 'user dosent exist' });

    if (userFound) {

      bcrypt.compare(params.password, userFound.password, (err, Valid) => {

        if (err) return res.status(404).send({ report: 'Error in password' });

        if (Valid) {

          return res.status(200).send({ token: jwt.createToken(userFound), userFound });

        } else {

          return res.status(404).send({ report: 'The user its not valid' })

        }
      })
    }
  })

}

function createUser(req, res) {
  var type = req.params.type;
  var params = req.body;
  var UserModel = new userModel();

  UserModel.nameUser = params.nameUser;
  UserModel.lastNameUser = params.lastNameUser;
  UserModel.nickName = params.nickName;
  UserModel.ageUser = params.ageUser;
  UserModel.email = params.email;
  UserModel.picture = params.picture;
  UserModel.type = type;


  if (type != usuario) {
    UserModel.nameOrg = params.nameOrg;
    UserModel.pictureOrg = params.pictureOrg;
    UserModel.direction = params.direction;
  }

  bcrypt.hash(params.password, null, null, (err, passewodEncriptada) => {
    if (err) return console.log("password request error");

    UserModel.password = passewodEncriptada

    userModel.findOne({ nickName: UserModel.nickName }, (err, userFound) => {
      if (err) return res.status(404).send({ report: 'Erro in find User' });
      if (userFound) return res.status(202).send({ report: 'User is exists' })

      UserModel.save((err, userSaved) => {
        if (err) return res.status(404).send({ report: 'Erro in save User' });
        return res.status(200).send(userSaved)
      })
    })

  })
}

function showUser(req,res) {
  var type = req.user.type;

 if(type != administrador) return res.status(404).send({report:'Usted no es administrador'})
  userModel.find({},(err,UserFound)=>{
    if(err) return res.status(404).send({report:'Erro in save User'});
    return res.status(200).send(UserFound)
  })
}

function compInfoVet(req, res) {
  var params = req.body;
  var user = req.user.sub;

  userModel.findByIdAndUpdate(user, params, { new: true, useFindAndModify: false }, (err, infoVet) => {
    if (err) return res.status(404).send({ mensaje: 'Error editing user' });
    if (!infoVet) return res.status(200).send({ mensaje: 'Vet was not edited' });
    return res.status(200).send(infoVet)
  })
}
function mostrarAlbergue(req, res){
userModel.find({type: Albergue},(err, albergueFound)=>{
  if(err) return res.status(500).send({ mensaje: 'Error en la petición' })
  if(!albergueFound) return res.status(500).send({ mensaje: 'No se han encontrado albergues' })

   return res.status(200).send(albergueFound)
  })

}

function editar(req,res){
  var idUser = req.params.idUser
  var params = req.body

  userModel.findByIdAndUpdate(idUser,params,(err,userUpdate)=>{
    if(err) return res.status(500).send({ report: 'Error en la petición' })
    if(userUpdate == null) return res.status(500).send({ report: 'No se actualizo el usuario'})
    console.log('hola')

    return res.status(200).send(userUpdate)
  })

}

function eliminar(req,res){
  var idUser = req.params.idUser

  userModel.findByIdAndDelete(idUser, (err,userDelete)=>{
    if(err) return res.status(500).send({ report: 'Error en la petición' })
    if(userDelete == null) return res.status(500).send({ report: 'No se borro el usuario'})

    return res.status(200).send(userDelete)
  })

}

function mostrarUsuarioId(req,res){
  var idUser = req.params.idUser;

  userModel.findById(idUser,(err,userFound)=>{
    if(err) return res.status(500).send({ report: 'Error en la petición' })
    if(!userFound) return res.status(500).send({ report: 'No se encontro el usuario'})

    return res.status(200).send(userFound)
  })
}

function miAlbergue(req, res){
  var token = req.user.sub

  userModel.findById(token, (err, albergueFound)=>{
    if(err) return res.status(500).send({mensaje: 'Error en la petición'})
    if(!albergueFound) return res.status(500).send({mensaje: 'No se han encontrado los datos'})

    return res.status(200).send(albergueFound)
  })
}
function editVet(req, res) {
  var params = req.body;
  var user = req.user.sub;

  userModel.findByIdAndUpdate(user, params, { new: true, useFindAndModify: false }, (err, vetEdited) => {
    if (err) return res.status(404).send({ mensaje: 'Error editing user' });
    if (!vetEdited) return res.status(200).send({ mensaje: 'Vet was not edited' });
    return res.status(200).send(vetEdited)
  })
}

function deleteVet(req, res) {
  var user = req.user.sub;

  Service.find({ organizacion: user }, (err, serviceFound) => {
    if (err) return res.status(500).send({ mensaje: 'Error' })

    if (serviceFound && serviceFound.length >= 1) {
      Service.deleteMany({ organizacion: user }, (err, servicesDeleted) => {
        if (err) return res.status(500).send({ mensaje: 'Error deleting services' })

        if (servicesDeleted) {
          userModel.findByIdAndDelete(user, (err, vetDeleted) => {
            if (err) return res.status(404).send({ mensaje: 'Error deleting veterinary' });
            if (!vetDeleted) return res.status(404).send({ mensaje: 'Vet was not deleted' })
            return res.status(200).send([servicesDeleted, vetDeleted]);
          })
        }
      })
    } else {
      userModel.findByIdAndDelete(user, (err, vetDeleted) => {
        if (err) return res.status(404).send({ mensaje: 'Error deleting veterinary' });
        if (!vetDeleted) return res.status(404).send({ mensaje: 'Vet was not deleted' })
        return res.status(200).send(vetDeleted);
      })

    }
  })

}

function getMyVet(req, res) {
  var idUsuario = req.params.idUsuario
  //Encuesta.find({ titulo: { $regex: 'encuesta', $options: 'i' } }, { listaComentarios: 0})
  userModel.findById(idUsuario, (err, vetsFound)=>{
    if(err) return res.status(500).send({mensaje: 'Error getting vets'});
    if(!vetsFound) return res.status(500).send({mensaje: 'Vets were not brought'});
    return res.status(200).send(vetsFound)
  })

}

function getVets(req, res) {
  //Encuesta.find({ titulo: { $regex: 'encuesta', $options: 'i' } }, { listaComentarios: 0})
  userModel.find({type: 'veterinaria'}, (err, vetsFound)=>{
    if(err) return res.status(500).send({mensaje: 'Error getting vets'});
    if(!vetsFound) return res.status(500).send({mensaje: 'Vets were not brought'});
    return res.status(200).send(vetsFound)
  })

}

module.exports = {
  createUser,
  Login,
  showUser,
  compInfoVet,
  editVet,
  deleteVet,
  getMyVet,
  getVets,
  mostrarUsuarioId,
  miAlbergue,
  eliminar,
  mostrarAlbergue,
  mostrarAlbergue,
  editar

}