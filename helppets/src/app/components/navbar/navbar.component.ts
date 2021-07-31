import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  public userModel: User;
  public token;
  public identidad;

  constructor(public userService:UserService,
              private router:Router) {
        this.identidad = this.userService.getIdentidad();
        this.userModel = new User("","","","","","","","","","","","","","",0,"","","","","");
               }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.userModel).subscribe(
      response=>{
        console.log(response)
        this.identidad = response.userFound
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken();
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));

      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  getToken(){
    this.userService.login(this.userModel).subscribe(
      response=>{
        console.log(response)
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Email o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }



  refresh(): void{
    window.location.reload();
  }

  cerrarSesion(){
    this.identidad = null;
    this.token = null;
    localStorage.setItem('identidad', JSON.stringify(this.identidad))
    localStorage.setItem('token', JSON.stringify(this.token));
    this.refresh()
  }



}
