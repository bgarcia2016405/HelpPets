import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-veterinaria',
  templateUrl: './veterinaria.component.html',
  styleUrls: ['./veterinaria.component.scss']
})
export class VeterinariaComponent implements OnInit {

  public idVeterinariaRuta: String;
  public veterinaria: User;
  public token;
  public services: Service;

  constructor(public _activatedRoute: ActivatedRoute, public userService: UserService, public servicesService: ServiceService) {
    this.veterinaria = new User("","","","","","","","","","","","","","",0,"","","","","");
    this.services = new Service("","","",0);
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idVeterinariaRuta = dataRuta.get('idVeterinaria');
    })
    console.log(this.idVeterinariaRuta)
    this.getMyVet()
    this.getServices();
  }

  getMyVet(){
    this.userService.getMyVet(this.idVeterinariaRuta).subscribe(
      response=>{
        this.veterinaria = response;
        console.log(response);        
      }
    )
  }
  
  getServices(){
    this.servicesService.getServices(this.idVeterinariaRuta).subscribe(
      response=>{
        this.services = response;
        console.log(this.services);
      }
    )
  }

}
