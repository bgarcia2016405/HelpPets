import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public state
  public userModel: User;
  public token;
  public identidad;


  constructor(
    public activate : ActivatedRoute,
    public userService: UserService
  ) {
    this.identidad = this.userService.getIdentidad();
    this.userModel = new User("","","","","","","","","","","","","","",0,"","","","","");

   }

  ngOnInit(): void {
    this.activate.paramMap.subscribe(dataRuta=>{
      this.state = dataRuta.get('state')
    })
    console.log(this.state)
  }


 registrar(){
   this.userModel.type = this.state;
   if(this.userModel.password1==this.userModel.password2){
    this.userModel.password = this.userModel.password1
    this.userService.registro(this.userModel,this.state).subscribe(
      response =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Creado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
   }else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Contraseña no coinciden',
      showConfirmButton: false,
      timer: 1500
    })
   }

 }

}
