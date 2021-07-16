'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");

const usuario = 'Usuario';
const Albergue = 'Albergador';
const Veterinario = 'Veterinario';



function createUser(req,res){

    var name = [
        {nickName:"UsuarioDueño",type:usuario},
        {nickName:"UsuarioVeterinaria",type:Albergue},
        {nickName:"UsuarioAlbergue",type:Veterinario}
    ]
    var password = '123456'
    bcrypt.hash(password, null, null, (err, encryptedPassword)=>{
    for (let index = 0; index < name.length; index++) {
        var UserModel = new userModel(); 
        UserModel.nickName = name[index].nickName;
        UserModel.type = name[index].type;


       
            
            
           
            UserModel.password = encryptedPassword;
            UserModel.save((err,userSave)=>{
                console.log(userSave)
            })
        
        
    }
})

return res.status(200).send({report:'Listo'})
}




module.exports ={
    createUser
}