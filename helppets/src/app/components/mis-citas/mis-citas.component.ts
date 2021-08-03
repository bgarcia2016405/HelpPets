import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.scss']
})
export class MisCitasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  seguridadCancelar(){
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
      }
    })
  }

}
