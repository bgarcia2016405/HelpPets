import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Date } from '../models/date.model';
import { DateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public url:String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor( public http: HttpClient) {
    this.url = GLOBAL.url
   }

   createDate(date: Date):Observable<any>{
     let params = JSON.stringify(date);
     let token = this.headers.set('Authorization', this.getToken())

     return this.http.post(this.url + '/createDate' , params, {headers: token})
   }

getService(id: String):Observable<any>{
  let token = this.headers.set('Authorization', this.getToken())

  return this.http.get(this.url + '/getService/' + id, {headers: token})
}

getVeterinariaId(id: String):Observable<any>{
  let token = this.headers.set('Authorization', this.getToken())

  return this.http.get(this.url + '/getVeterinariaId/' + id, {headers: token})
}

getMyDate():Observable<any>{
  let token = this.headers.set('Authorization', this.getToken())

  return this.http.get(this.url + '/getMyDate', {headers: token})
}

getDatesOrg(id: String):Observable<any>{
  let token = this.headers.set('Authorization', this.getToken())

  return this.http.get(this.url + '/getDatesOrg/' + id, {headers: token})
}

editarDate(id: String, date: Date):Observable<any>{
  let params = JSON.stringify(date);
  let token = this.headers.set('Authorization', this.getToken())

  return this.http.put(this.url + '/editarDate/' + id, params,{headers: token})
}

buscarIdDate(id: String):Observable<any>{
  let token = this.headers.set('Authorization', this.getToken())

  return this.http.get(this.url + '/buscarIdDate/' + id, {headers: token})
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

  }
