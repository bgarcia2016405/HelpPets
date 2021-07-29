import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-albergues',
  templateUrl: './albergues.component.html',
  styleUrls: ['./albergues.component.scss'],
  providers: [ UserService ]
})
export class AlberguesComponent implements OnInit {
  usuario: User;

  constructor( public userService: UserService) {
    this.usuario = new User("","","","","","","","","","","","","","");
  }

  ngOnInit(): void {
    this.mostrarAlbergue()
  }

  mostrarAlbergue(){
    this.userService.mostrarAlbergue().subscribe(
      response =>{
        console.log(response);
        this.usuario = response;
        console.log(this.usuario)
      }
    )
  }

}
