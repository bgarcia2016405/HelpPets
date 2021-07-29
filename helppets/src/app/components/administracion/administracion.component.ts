import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
  providers:[UserService]
})
export class AdministracionComponent implements OnInit {

 public usuario: User;
  public editarUsuarioModel:User
  public eliminarUsuarioModel:User

  constructor(public userService: UserService) {
    this.usuario = new User("","","","","","","","","","","","","","");
    this.editarUsuarioModel = new User("","","","","","","","","","","","","","");
    this.eliminarUsuarioModel = new User("","","","","","","","","","","","","","");
  }

  ngOnInit(): void {
    this.mostrarUsuario()
  }

  mostrarUsuario(){
    this.userService.mostrarUsuario().subscribe(
      response=>{
        this.usuario = response
        console.log(this.usuario)
      }
    )
  }

  editarUsuario(idUser){
    this.userService.editarUsuario(idUser,this.editarUsuarioModel).subscribe(

      response=>{
        console.log(response)
      }
    )
    this.mostrarUsuario()
  }

  eliminarUsuario(idUser){
    this.userService.eliminarUsuario(idUser).subscribe(
      response=>{
        console.log(response)
      }
    )
    this.mostrarUsuario()
  }

  mostrarUsuarioId(idUsuario){
    this.userService.mostrarUsuarioId(idUsuario).subscribe(
      response=>{

        this.editarUsuarioModel = response
        console.log(this.editarUsuarioModel)
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

}
