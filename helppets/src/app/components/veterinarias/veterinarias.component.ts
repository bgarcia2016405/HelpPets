import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-veterinarias',
  templateUrl: './veterinarias.component.html',
  styleUrls: ['./veterinarias.component.scss']
})
export class VeterinariasComponent implements OnInit {
  
  public veterinarias;
  public vetModelGetId: User;
  public userModel: User;

  constructor(public userService: UserService) { 
    this.vetModelGetId = new User("","","","","","","","","","","","","","",0,"","","","","");
    this.userModel = new User("","","","","","","","","","","","","","",0,"","","","","");
  }

  ngOnInit(): void {
    this.getVets();
  }

  getVets(){
    this.userService.getVets().subscribe(
      response => {
        this.veterinarias = response
        console.log(response)
      }
    )
  }

  getMyVet(idUsuario){
    this.userService.getMyVet(idUsuario).subscribe(
      response=>{
        this.vetModelGetId = response;
        console.log(this.vetModelGetId);
      }
    )
  }

  editVetAdmin(idUser){
    this.userService.editVetAdmin(idUser, this.vetModelGetId).subscribe(
      response=>{
        console.log(response);
        
      }
    )
    this.getVets();
  }

  deleteVetAdmin(idUser){
    this.userService.eliminarUsuario(idUser).subscribe(
      response=>{
        console.log(response)
      }
    )
    this.getVets();
  }

}
