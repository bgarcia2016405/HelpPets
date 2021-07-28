import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
  providers:[UserService]
})
export class AdministracionComponent implements OnInit {

  usuario: User;

  constructor(public userService: UserService) {
    this.usuario = new User("","","","","","","","","","","","","","");
   }

  ngOnInit(): void {
    this.mostrarUsuario()
  }

  mostrarUsuario(){
    this.userService.mostrarUsuario().subscribe(
      response=>{
        this.usuario = response
        console.log(this.usuario)
      }
    )
  }

}
