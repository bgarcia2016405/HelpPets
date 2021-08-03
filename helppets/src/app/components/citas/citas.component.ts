import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Date } from 'src/app/models/date.model';
import { User } from 'src/app/models/user.model';
import { Service } from 'src/app/models/service.model';
import { DateService } from 'src/app/services/date.service';

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
    public dateService: DateService
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
