import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { New } from 'src/app/models/new.model';
import { NewService } from 'src/app/services/new.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.scss'],
  providers: [UserService, NewService],
})
export class DetalleNoticiaComponent implements OnInit {
  public newModel;
  public token;
  public idNewRute: string;
  constructor(
    public _userService: UserService,
    public _newService: NewService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.newModel = new New(
      '',
      '',
      '',
      '',
      '',
      { si: 0, no: 0, ninguna: 0, usersComment: [] },
      [{ commentDate:'', commentText: '', idUserComment: '' }],
      ''
  );
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idNewRute = dataRuta.get('idNew');
    });
    this.getNew(this.idNewRute);
  }

  getNew(idNew) {
    this._newService
      .getNew(this.token, idNew)
      .subscribe((response) => {
        this.newModel = response.newFound;
        console.log(response);
      });
  }

}




