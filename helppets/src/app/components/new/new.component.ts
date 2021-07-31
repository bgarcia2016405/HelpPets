import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { New } from 'src/app/models/new.model';
import { NewService } from 'src/app/services/new.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
  /*,
  providers: [NewService, UserService],*/
})
export class NewComponent implements OnInit {

  public token;
  public identidad;
  public newsModelGet: New;
  public newsModelAdd: New;
  public newsModelGetId: New;

  public modelComment = {
    idNew: '',
    commentText: ''
  }

  constructor(
    public _newService: NewService,
    public _userService: UserService,
    public _router: Router
  ) {
    this.token = this._userService.getToken();
    this.newsModelAdd = new New(
      '',
      '',
      '',
      '',
      '',
      { si: 0, no: 0, ninguna: 0, usersComment: [] },
      [{ commentDate:'',commentText: '', idUserComment: '' }],
      ''
    );
    this.newsModelGetId = new New(
      '',
      '',
      '',
      '',
      '',
      { si: 0, no: 0, ninguna: 0, usersComment: [] },
      [{  commentDate:'',commentText: '', idUserComment: '' }],
      ''
  );
    this.identidad = this._userService.getIdentidad();
   }

  ngOnInit(): void {
    this.getNews();
    console.log(this.identidad.type)
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

  getNew(idNew) {
    this._newService.getNew(this.token, idNew).subscribe(
      response => {
        this.newsModelGetId = response.newFound;
        console.log(this.newsModelGetId);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  createNew() {

    if(
      this.newsModelAdd.newsDescription===''
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

    this._newService.createNew(this.newsModelAdd, this.token).subscribe(
      response=>{
        this.newsModelAdd.newsDescription = '';
        this.newsModelAdd.pictures = '';
        console.log(response);

      Swal.fire({
        /*position: 'top',*/
        icon: 'success',
        title: 'Noticia creada correctamente',
        showConfirmButton: false,
        timer: 1500,
      });

      this.getNews();
        this.getNews()
      }
    );
  }
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

  editNew(){
    if(
      this.newsModelGetId.newsDescription===''
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

  this._newService.editNew(this.newsModelGetId).subscribe(
    response=>{
      console.log(response);

      Swal.fire({
        /*position: 'top',*/
        icon: 'success',
        title: 'Noticia editada y actualizada correctamente',
        showConfirmButton: false,
        timer: 1500,
      });

      this.getNews();
    }
  )
}
}

  deleteNew(idNew) {
    this._newService.deleteNew(idNew).subscribe(
      response=>{
        console.log(response);
        this.getNews();
      }
    )
  }
  //Otra manera de Navegar con Parametros
  navegarDetalleNew(idNew) {
    this._router.navigate(['/detalleNoticia', idNew]);
  }
}
