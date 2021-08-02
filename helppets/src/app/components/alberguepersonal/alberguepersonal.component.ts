import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { User } from 'src/app/models/user.model';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'

@Component({
  selector: 'app-alberguepersonal',
  templateUrl: './alberguepersonal.component.html',
  styleUrls: ['./alberguepersonal.component.scss'],
  providers: [ UserService, PetService ],
})
export class AlberguepersonalComponent implements OnInit {
  public usuario: User;
  public pet: Pet;
  public petAdd: Pet;
  public petUpdate: Pet;
  public albergueUpdate: User;
  public token;
  public idPet: Pet;
  public identidad;
  public idUser: User;

  constructor( public userService: UserService, public petService: PetService,private _router: Router) {
    this.usuario = new User("","","","","","","","","","","","","","",);
    this.idUser = new User("","","","","","","","","","","","","","")
    this.pet = new Pet("","","","","","","");
    this.petAdd = new Pet("","","","","","","");
    this.idPet = new Pet("","","","","","","");
    this.petUpdate = new Pet("","","","","","","")
    this.albergueUpdate = new User("","","","","","","","","","","","","","")
  }

  ngOnInit(): void {
    this.miAlbergue()
    this.mostrarMascotas()
  }


miAlbergue(){
  this.userService.miAlbergue().subscribe(
    response =>{
      console.log(response);
      this.usuario = response;
      console.log(this.usuario);
    }
  )
}

refresh(): void{
  window.location.reload();
}

mostrarMascotas(){
  this.petService.mostrarMascotas().subscribe(
    response =>{
      console.log(response);
      this.pet = response;
      console.log(this.pet);
    }
  )
}

crearMascota(){
  this.petService.crearMascota(this.petAdd).subscribe(
    response=>{
      console.log(response)
      this.refresh()
    }
   )
}

buscarMascotaID(idPet){
  this.petService.buscarMascotaID(idPet).subscribe(
    response=>{
      console.log(response);
      this.idPet = response;
      this.petUpdate = response;
    }
  )
}

eliminarMascota(idPet){
  this.petService.eliminarMacota(idPet).subscribe(
    response=>{
      console.log(response);
      this.mostrarMascotas()
    }
  )
}

seguridadEliminar(idPet){
  this.petService.buscarMascotaID(idPet).subscribe(
    response=>{
      this.idPet = response;
      Swal.fire({
        title: '¿Quieres eliminar esta mascota?   ' + this.idPet.name,
        text: "No se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo'
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarMascota(this.idPet._id)
          Swal.fire(
            'Eliminado!',
            'La mascota ha sido eliminada con exito',
            'success'
          )
        }
      })

    }
  )
}

editarMascota(){
  this.petService.editarMascota(this.petUpdate._id, this.petUpdate).subscribe(
    response =>{
      console.log(response);
      this.mostrarMascotas()
    }
  )
}

mostrarAlbergue(){
  this.userService.mostrarAlbergue().subscribe(
    response =>{
      console.log(response);
      this.usuario = response;
      console.log(this.usuario)
    }
  )
}

eliminarAlbergue(idUser){
  this.userService.eliminarAlbergue(idUser).subscribe(
    response=>{
      console.log(response);
      this.mostrarAlbergue()
    }
  )
}

buscarAlbergueID(idUser){
this.userService.buscarAlbergueID(idUser).subscribe(
  response=>{
    console.log(response);
    this.idUser = response;
    this.albergueUpdate = response;
  }
)
}

seguridadEliminarAlbergue(idUser){
  this.userService.buscarAlbergueID(idUser).subscribe(
    response=>{
      this.idUser = response;
      Swal.fire({
        title: '¿Seguro que quieres eliminar tu Albergue?  ' + this.idUser.nameOrg,
        text: "Se eliminarán todos tus datos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro '
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarAlbergue(this.idUser._id)
          this._router.navigate(['/home'])
          this.cerrarSesion()
          Swal.fire(
            'Eliminado!',
            'Tus datos han sido eliminados correctamente',
            'success'
          )
        }
      })

    }
  )
}

editarAlbergue(){
  this.userService.editarAlbergue(this.usuario._id, this.usuario).subscribe(
    response=>{
      console.log(response);
      this.mostrarAlbergue();
    }
  )
  this.refresh()
}

cerrarSesion(){
  this.identidad = null;
  this.token = null;
  localStorage.setItem('identidad', JSON.stringify(this.identidad))
  localStorage.setItem('token', JSON.stringify(this.token));
  this.refresh()
}

}
