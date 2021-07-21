'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");

const usuario = 'dueño';
const Albergue = 'albergue';
const Veterinario = 'veterinaria';

function Login(req,res){
    var params = req.body;
    
    userModel.findOne({ nickName : params.nickName }, (err, userFound)=>{
        if(err) return res.status(404).send({ report: 'Error at Login'});

        if(!userFound) return res.status(404).send({ report: 'user dosent exist'});

        if(userFound){

            bcrypt.compare(params.password, userFound.password, (err,Valid)=>{

                if(err) return res.status(404).send({ report : 'Error in password'});

                 if(Valid) {

                     return res.status(200).send({ token: jwt.createToken(userFound), userFound}  );
                
                 }else {

                    return res.status(404).send({ report: 'The user its not valid'})
                    
                 }
             })
        }
    })

}

function createUser(req,res){
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


  if(type != usuario){
    UserModel.nameOrg = params.nameOrg;
    UserModel.pictureOrg = params.pictureOrg;
    UserModel.direction = params.direction;
  }

  bcrypt.hash(params.password,null,null,(err, passewodEncriptada)=>{
    if(err) return console.log("password request error");

    UserModel.password = passewodEncriptada
    
 userModel.findOne({nickName:UserModel.nickName},(err,userFound)=>{
    if(err) return res.status(404).send({report:'Erro in find User'});
    if(userFound) return res.status(202).send({report:'User is exists'})

    UserModel.save((err,userSaved)=>{
      if(err) return res.status(404).send({report:'Erro in save User'});
      return res.status(200).send(userSaved)
    })
  })

  })

 

}




module.exports ={
    createUser,
    Login
}