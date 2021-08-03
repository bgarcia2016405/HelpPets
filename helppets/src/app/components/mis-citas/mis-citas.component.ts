import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from 'src/app/services/date.service';
import { Date } from 'src/app/models/date.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.scss'],
  providers: [ DateService]
})
export class MisCitasComponent implements OnInit {

  public dates: Date;
  public dateEdit: Date;

  constructor(
    public dateService: DateService
  ) {
    this.dates = new Date("","","","","","")
    this.dateEdit = new Date("","","","","","")
   }


  ngOnInit(): void {
    this.mostrarCitas()
  }

  mostrarCitas(){
    this.dateService.getMyDate().subscribe(
      responce=>{
        this.dates= responce
      }
    )
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

  editarDate(){
    this.dateService.editarDate(this.dateEdit._id, this.dateEdit).subscribe(
      response=>{
        console.log(response)
        this.mostrarCitas()
      }
    )
  }

}
