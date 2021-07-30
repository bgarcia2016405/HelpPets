import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { New } from 'src/app/models/new.model';
import { NewService } from 'src/app/services/new.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [NewService, UserService],
})
export class NewComponent implements OnInit {

  public token;
  public newsModelGet: New;
  public newsModelAdd: New;
  public newsModelGetId: New;

  public modelComment = {
    idNew: '',
    commentText: ''
  }

  constructor(
    private _newService: NewService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.newsModelAdd = new New(
      '',
      '',
      '',
      '',
      '',
      { si: 0, no: 0, ninguna: 0, usersComment: [] },
      [{ commentText: '', idUserComment: '' }],
      ''
    );
   }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this._newService.getNews(this.token).subscribe(
      (response) => {
        this.newsModelGet = response.newsFound;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getNewId(idNew){
    this._newService.getNewId(this.token, idNew).subscribe(
      response => {
        this.newsModelGetId =response.newFound;
        console.log(response);
      }
    )
  }

  createNew() {
    this._newService.createNew(this.newsModelAdd, this.token).subscribe(
      response=>{
        this.newsModelAdd.newsDescription = '';
        this.newsModelAdd.pictures = '';
        console.log(response);
        this.getNews()
      }
    );
  }

  addCommentNew(){
    this.modelComment.idNew = String(this.newsModelGetId._id);
    this._newService.addCommentNew(this.token, this.modelComment).subscribe(
      response=>{
        console.log(response);
        this.modelComment.commentText = '';
      }
    )
  }

  //Otra manera de Navegar con Parametros
  navegarDetalleNew(idNew) {
    this._router.navigate(['/detalleNoticia', idNew]);
  }
}
