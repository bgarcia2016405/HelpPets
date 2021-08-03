import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { DateService } from 'src/app/services/date.service';
import { Date } from 'src/app/models/date.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-veterinaria',
  templateUrl: './mi-veterinaria.component.html',
  styleUrls: ['./mi-veterinaria.component.scss']
})
export class MiVeterinariaComponent implements OnInit {
  public userModel: User;
  public serviceModelGet: Service;
  public serviceModelGetId: Service;
  public serviceModelCreate: Service;
  public dates: Date;
  public dateEdit: Date;
  public identidad;
  public token;

  constructor(public userService:UserService, public servicesService:ServiceService,public dateService: DateService) {
    this.identidad = this.userService.getIdentidad();
    this.userModel = new User("","","","","","","","","","","","","","",0,"","","","","");
    this.serviceModelCreate = new Service("","","",0);
    this.serviceModelGetId = new Service('', '', '',0);
    this.dates = new Date("","","","","","")
    this.dateEdit = new Date("","","","","","")
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.getMyServices();

    this.mostrarCitas()
  }

  mostrarCitas(){
    this.dateService.getDatesOrg(this.identidad._id).subscribe(
      responce=>{
        this.dates= responce
        console.log(this.dates)
      }
    )
  }

  getMyVet(idUsuario){
    this.userService.getMyVet(idUsuario).subscribe(
      response=>{
        this.userModel = response;
        console.log(response);
      }
    )
  }

  editVet(){
    this.userService.editVet(this.userModel).subscribe(
      response=>{
        console.log(response)
        this.identidad = response
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
      }
    )
  }

  deleteVet(){
    this.userService.deleteVet().subscribe(
      response=>{
        console.log(response)
        this.cerrarSesion();
      }
    )
  }

  getMyServices(){
    this.servicesService.getMyServices(this.token).subscribe(
      response=>{
        this.serviceModelGet = response;
        console.log(this.serviceModelGet);
      }
    )
  }

  getServiceId(id) {
    this.servicesService.getServiceId(this.token, id).subscribe(
      response => {
        this.serviceModelGetId = response;
        console.log(this.serviceModelGetId);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  createService() {
    this.servicesService.createService(this.serviceModelCreate, this.token).subscribe(
      response=>{
        console.log(response);
        this.getMyServices();
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Información insuficiente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  editService(){
    this.servicesService.editService(this.serviceModelGetId, this.serviceModelGetId._id).subscribe(
      response=>{
        this.serviceModelGetId = response;
        console.log(this.serviceModelGetId);
        this.getMyServices();
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Llena los campos correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  deleteService(){
    this.servicesService.deleteService(this.serviceModelGetId._id).subscribe(
      response=>{
        console.log(response);
        this.getMyServices();
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

  seguridadCancelar(idPet){
    this.dateService.buscarIdDate(idPet).subscribe(

      response=>{

        this.dateEdit = response
        this.dateEdit.state = 'cancelado'
        console.log(response)
        Swal.fire({
          title: '¿Quieres cancelar la cita?   ',
          text: "No se podra revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, cancelala'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(

              'Cancelada!',
              'La cita ha sido cancelada con exito',
              'success'
            )
            this.editarDate();
          }
        })
      }
    )
}

seguridadTerminar(idPet){
  this.dateService.buscarIdDate(idPet).subscribe(

    response=>{

      this.dateEdit = response
      this.dateEdit.state = 'termida'
      console.log(response)
      Swal.fire({
        title: 'Se termino la cita ',
        text: "No se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, muy satisfecho'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(

            'Terminada!',
            'Esperamos que regrese',
            'success'
          )
          this.editarDate();
        }
      })
    }
  )
}

  editarDate(){
    this.dateService.editarDate(this.dateEdit._id, this.dateEdit).subscribe(
      response=>{
        console.log(response)
        this.mostrarCitas()
      }
    )
  }


}
