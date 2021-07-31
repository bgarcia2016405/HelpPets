import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:String;
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public identidad;
  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }


  login(usuario):Observable<any>{
    let params = JSON.stringify(usuario)

    return this.http.post(this.url + '/Login', params, {headers: this.headers})
  }

  showUser():Observable<any>{

    return this.http.get(this.url + '/showAllUser', {headers: this.headers})
  }

  registro(usuario: User, type):Observable<any>{
    let params = JSON.stringify(usuario);

    return this.http.post(this.url + '/createUser/'+type, params,{headers: this.headers})
  }

  getMyVet(id:String): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken())
    return this.http.get(this.url + '/getMyVet/' + id, {headers: token})
  }
  mostrarAlbergue():Observable<any>{
    return this.http.get(this.url + '/mostrarAlbergue', {headers: this.headers})
  }

  editVet(veterinaria:User): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken())
    let params = JSON.stringify(veterinaria);
    return this.http.put(this.url + '/editVet', params, {headers: token} )
  }

  getVets(): Observable<any> {
    let token = this.headers.set('Authorization', this.getToken())

    return this.http.get(this.url + '/getVets', { headers: token });
  }


  mostrarUsuario():Observable<any>{
    let headers = this.headers.set('Authorization',this.getToken())
    return this.http.get(this.url + '/mostrarUsuarios', {headers:headers})
  }

  editarUsuario(idUser,usuario:User):Observable<any>{
    let header = this.headers.set('Authorization', this.getToken())
    let params = JSON.stringify(usuario)

    return this.http.put(this.url + '/editarUsuario/'+idUser, params, {headers:header})
  }

  eliminarUsuario(idUser):Observable<any>{
    let header = this.headers.set('Authorization', this.getToken())

    return this.http.delete(this.url + '/eliminarUsuario/'+ idUser, {headers:header})
  }

  mostrarUsuarioId(idUser):Observable<any>{
    let header = this.headers.set('Authorization', this.getToken())
    return this.http.get(this.url + '/mostrarUsuarioId/' + idUser, {headers:header})
  }


  miAlbergue():Observable<any>{
    let headers = this.headers.set('Authorization', this.getToken())

    return this.http.get(this.url + '/miAlbergue', {headers: headers})
  }

  getToken(){
    var token2 = localStorage.token;
    if(token2 != undefined){
      this.token = token2;
    }else{
      this.token = null
    }
    return this.token
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem("identidad"))
    if(identidad2 != undefined){
       this.identidad = identidad2;
    }else{
       this.identidad = null;
    }
    return this.identidad;
 }

}
