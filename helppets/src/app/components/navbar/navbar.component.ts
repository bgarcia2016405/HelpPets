import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  public userModel: User;
  public token;
  public identidad;
  public editarUsuarioModel;
  public eliminarUsuarioModel

  constructor(public userService:UserService,
              private router:Router) {
        this.identidad = this.userService.getIdentidad();
        this.userModel = new User("","","","","","","","","","","","","","");
        this.editarUsuarioModel = new User("","","","","","","","","","","","","","");
        this.eliminarUsuarioModel = new User("","","","","","","","","","","","","","");
      }

  ngOnInit(): void {
    this.editarUsuarioModel = this.identidad
  }

  login(){
    this.userService.login(this.userModel).subscribe(
      response=>{
        console.log(response)
        this.identidad = response.userFound
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken();
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.refresh()

      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  getToken(){
    this.userService.login(this.userModel).subscribe(
      response=>{
        console.log(response)
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Email o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  editarUsuario(idUser){
    this.userService.editarUsuario(idUser,this.editarUsuarioModel).subscribe(

      response=>{
        console.log(response)
      }
    )

  }

  eliminarUsuario(idUser){
    this.userService.eliminarUsuario(idUser).subscribe(
      response=>{
        console.log(response)
        this.cerrarSesion()
      }
    )

  }

  seguro(idUsuario){
    this.userService.mostrarUsuarioId(idUsuario).subscribe(
      response=>{

        this.eliminarUsuarioModel = response
        console.log(this.eliminarUsuarioModel)
        Swal.fire({
          title: '¿Quieres eliminar este usuario?' + this.eliminarUsuarioModel.nickName,
          text: "No se podra revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo'
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarUsuario(this.eliminarUsuarioModel._id)
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado con exito',
              'success'
            )
          }
        })
      }
    )

  }

  refresh(): void{
    window.location.reload();
  }

  cerrarSesion(){
    this.identidad = null;
    this.token = null;
    localStorage.setItem('identidad', JSON.stringify(this.identidad))
    localStorage.setItem('token', JSON.stringify(this.token));
    this.refresh()
  }



}
