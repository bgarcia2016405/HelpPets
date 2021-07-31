import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mi-veterinaria',
  templateUrl: './mi-veterinaria.component.html',
  styleUrls: ['./mi-veterinaria.component.scss']
})
export class MiVeterinariaComponent implements OnInit {
  public userModel: User;
  public identidad;

  constructor(public userService:UserService) { 
    this.identidad = this.userService.getIdentidad();
    this.userModel = new User("","","","","","","","","","","","","","",null,"","","","","");
  }

  ngOnInit(): void {
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

}
