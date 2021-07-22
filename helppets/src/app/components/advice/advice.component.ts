import { Component, OnInit } from '@angular/core';
import { Advice } from 'src/app/models/advice.model';
import { AdviceService } from 'src/app/services/advice.service';
import Swal from 'sweetalert2';

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
    private _adviceService: AdviceService
  ) {
    //this.token = this.identidad.getToken();
    this.adviceModelCreate = new Advice('', '', '', '')
    this.adviceModelGetId = new Advice('', '', '', '')
    //this.identidad = this.identidad.getIdentidad();
  }

  ngOnInit(): void {
   // this.getAdvices();
   // console.log(this.identidad.type)
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

  getAdviceId(id) {
    this._adviceService.getAdviceId(this.token, id).subscribe(
      response => {
        this.adviceModelGetId = response.AdviceFound;
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

  editAdvice() {
    this._adviceService.editAdvice(this.adviceModelGetId, this.adviceModelGetId._id).subscribe(
      response=>{
        this.adviceModelGetId = response.adviceEdited;
        console.log(this.adviceModelGetId);
        this.getAdvices();
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Intenta con otros datos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  deleteAdvice() {
    this._adviceService.deleteAdvice(this.adviceModelGetId._id).subscribe(
      response=>{
        console.log(response);
        this.getAdvices();
      }
    )
  }

}

