import { Component, OnInit } from '@angular/core';
import { Advice } from 'src/app/models/advice.model';
import { AdviceService } from 'src/app/services/advice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnInit {
  public token;
  public identidad
  public adviceModelGet: Advice;
  public adviceModelGetId: Advice;
  public adviceModelCreate: Advice;

  constructor(
    public _adviceService: AdviceService,
    public _userService: UserService,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.adviceModelCreate = new Advice('', '', '', '','','')
    this.adviceModelGetId = new Advice('', '', '', '','','')
    this.identidad = this._userService.getIdentidad();
  }

  ngOnInit(): void {
   this.getAdvices();
   console.log(this.identidad.type)
  }

  getAdvices() {
    this._adviceService.getAdvices(this.token).subscribe(
      response => {
        this.adviceModelGet = response.advicesFound;
        console.log(this.adviceModelGet);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getAdviceId(idAdvice) {
    this._adviceService.getAdviceId(this.token, idAdvice).subscribe(
      response => {
        this.adviceModelGetId = response.adviceFound;
        console.log(this.adviceModelGetId);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  createAdvice() {
    this._adviceService.createAdvice(this.adviceModelCreate, this.token).subscribe(
      response=>{
        this.adviceModelCreate.title = '';
        this.adviceModelCreate.resume = '';
        this.adviceModelCreate.advice = '';
        this.adviceModelCreate.picture = '';
        console.log(response);
        this.getAdvices();
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Información insuficiente o el consejo ya existe',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  editAdvice(){
    if(
      this.adviceModelGetId.title===''||
      this.adviceModelGetId.resume===''||
      this.adviceModelGetId.advice===''||
      this.adviceModelGetId.picture===''
    )
    {
      Swal.fire({
        /*position: 'top',*/
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{

  this._adviceService.editAdvice(this.adviceModelGetId).subscribe(
    response=>{
      console.log(response);

      Swal.fire({
        /*position: 'top',*/
        icon: 'success',
        title: 'Consejo editado y actualizado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });

      this.getAdvices();
    }
  )
}
}

  deleteAdvice() {
    this._adviceService.deleteAdvice(this.adviceModelGetId._id).subscribe(
      response=>{
        console.log(response);
        this.getAdvices();
      }
    )
  }

/*
  navegarDetalleConsejo(idAdvice) {
    this._router.navigate(['/detalleConsejo', idAdvice]);
  }
*/
}

