import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Date } from 'src/app/models/date.model';
import { User } from 'src/app/models/user.model';
import { Service } from 'src/app/models/service.model';
import { DateService } from 'src/app/services/date.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  providers: [ DateService ]
})
export class CitasComponent implements OnInit {
  public idVeterinaria: String;
  public dateAdd: Date;
  public veterinariaaGet: User;
  public serviceeGet: Service;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public dateService: DateService,
    public route: Router
  ) {
    this.dateAdd = new Date("","","",""),
    this.veterinariaaGet = new User("","","","","","","","","","","","","","",0,"","","","",""),
    this.serviceeGet = new Service("","","",0)
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idVeterinaria = dataRuta.get('idVeterinaria');
    });

   this.serviceGet(this.idVeterinaria);
    this.veterinariaGet(this.idVeterinaria)
    console.log(this.idVeterinaria);
  }

  createDate(){
    this.dateService.createDate(this.dateAdd).subscribe(
      response => {
        console.log(response)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cita reservada',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigate(['/home'])
      },
      err=>{
        console.log(<any>err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No autorizado para hacer esta acción',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  serviceGet(id){
this.dateService.getService(id).subscribe(
  response => {
    console.log(response);
    this.serviceeGet = response;
  }
)
  }

  veterinariaGet(id){
    this.dateService.getVeterinariaId(id).subscribe(
      response => {
        console.log(response);
        this.veterinariaaGet = response;
      }
    )
  }


}
