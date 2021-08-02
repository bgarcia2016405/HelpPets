import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-mis-mascotas',
  templateUrl: './mis-mascotas.component.html',
  styleUrls: ['./mis-mascotas.component.scss'],
  providers: [ PetService ]
})
export class MisMascotasComponent implements OnInit {

  public idAlbergueRuta: String;
  public pet: Pet;
  constructor(public _activatedRoute: ActivatedRoute, public petService: PetService) {
    this.pet = new Pet("","","","","","","","","")
  }

  ngOnInit(): void {
    this.mostrarMascota()
  }

  mostrarMascota(){
    this.petService.mostrarMascotas().subscribe(
      response=>{
        console.log(response)
        this.pet = response
      }
    )
  }

}
