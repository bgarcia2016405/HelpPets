import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.scss'],
  providers: [ PetService ]
})
export class AdopcionComponent implements OnInit {
  public idMascota: String;
  public mascota: Pet;
  public adopcionm: Pet;


  constructor(
    public _activatedRoute: ActivatedRoute,
     public petService: PetService
    ) {
    this.mascota = new Pet("","","","","","","","","")
    this.adopcionm = new Pet("","","","","","","","","")
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idMascota = dataRuta.get('idMascota')
    })

    this.mostrarMascota();
    console.log(this.idMascota)

  }

mostrarMascota(){
  this.petService.mostrarMascotaId(this.idMascota).subscribe(
    response=>{

      this.mascota = response.mascotaEncontrada;
      console.log(response);
    }
  )
}

adoptarMascota(){

  this.petService.adoptarMascota(this.idMascota,this.adopcionm).subscribe(
    response=>{
      console.log(response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mascota en Espera',
        showConfirmButton: false,
        timer: 1500
      })

    }
  )
}


}
