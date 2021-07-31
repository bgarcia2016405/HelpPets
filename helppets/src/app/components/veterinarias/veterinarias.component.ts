import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-veterinarias',
  templateUrl: './veterinarias.component.html',
  styleUrls: ['./veterinarias.component.scss']
})
export class VeterinariasComponent implements OnInit {
  
  public veterinarias;

  constructor(public userService: UserService) { 

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


}
