import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { User } from 'src/app/models/user.model';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
  public token;
  public idPet: Pet;

  constructor( public userService: UserService, public petService: PetService) {
    this.usuario =  new User("","","","","","","","","","","","","","",0,"","","","","");
    this.pet = new Pet("","","","","","","","","")
    this.petAdd = new Pet("","","","","","","","","")
    this.idPet = new Pet("","","","","","","","","")
    this.petUpdate = new Pet("","","","","","","","","")
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
  this.petService.mostrarMascotasOrg().subscribe(
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

editarMascotaState(){

  this.petService.editarMascota(this.petUpdate._id, this.petUpdate).subscribe(
    response =>{
      console.log(response);
      this.mostrarMascotas()
    }
  )
}

seguridadEditarState(idPet){

  this.petService.buscarMascotaID(idPet).subscribe(
    response=>{
      this.petUpdate = response;
      this.petUpdate.state = 'cuidando'
      Swal.fire({
        title: '¿Quieres cancelar la adopción de ' + this.petUpdate.name,
        text: "No se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.editarMascotaState()
          Swal.fire(
            'Cancelada!',
            'La adopción a sido cancelada',
            'success'
          )
        }
      })

    }
  )
}
seguridadAdoptado(idPet){
  console.log(this.petUpdate)
  this.petService.buscarMascotaID(idPet).subscribe(
    response=>{
      this.petUpdate = response;

  this.petUpdate.state = 'adoptado'

  console.log(this.petUpdate)
      Swal.fire({
        title: this.petUpdate.name + ' fué adoptado?',
        text: "Confirmar con el botón de abajo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, fué Adoptado'
      }).then((result) => {
        if (result.isConfirmed) {
          this.editarMascotaState()
          Swal.fire(
            'De acuerdo!',
            'La mascota fué adoptada',
            'success'
          )
        }
      })

    }
  )
}

}
