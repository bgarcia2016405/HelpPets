import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss'],
  providers: [ PetService ]
})
export class MascotasComponent implements OnInit {
  public idAlbergueRuta: String;
  pet: Pet;

  constructor(public _activatedRoute: ActivatedRoute, public petService: PetService) {
    this.pet = new Pet("","","","","","","")
  }

  ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idAlbergueRuta = dataRuta.get('idAlbergue');
    });

    this.mostrarMascotasUser();
    console.log(this.idAlbergueRuta)

  }

  mostrarMascotasUser(){
    this.petService.mostrarMascotasUser(this.idAlbergueRuta).subscribe(
      response=>{
        console.log(response);
        this.pet = response;
      }
    )}

}
