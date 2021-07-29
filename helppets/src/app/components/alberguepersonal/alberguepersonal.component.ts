import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { User } from 'src/app/models/user.model';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alberguepersonal',
  templateUrl: './alberguepersonal.component.html',
  styleUrls: ['./alberguepersonal.component.scss'],
  providers: [ UserService, PetService ],
})
export class AlberguepersonalComponent implements OnInit {
  usuario: User;
  pet: Pet;

  constructor( public userService: UserService, public petService: PetService) {
    this.usuario = new User("","","","","","","","","","","","","","",);
    this.pet = new Pet("","","","","","","");
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

mostrarMascotas(){
  this.petService.mostrarMascotas().subscribe(
    response =>{
      console.log(response);
      this.pet = response;
      console.log(this.pet);
    }
  )
}

}
