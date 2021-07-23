import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advice } from '../models/advice.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AdviceService {

  public url: String;
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public identidad;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }

  createAdvice(advice: Advice, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(advice);

    return this.http.post(this.url + '/createAdvice', params, {headers: headersToken})
  }

  editAdvice(advice: Advice):Observable<any>{
    let params = JSON.stringify(advice);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this.http.put(this.url + '/editAdvice/' + advice._id, params, {headers: headersToken})
  }

  deleteAdvice(id){
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.delete(this.url + '/deleteAdvice/' + id, { headers: headersToken})
  }

  getAdvices(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)

    return this.http.get(this.url + '/getAdvices', { headers: headersToken });
  }

  getAdviceId(token, id): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)

    return this.http.get(this.url + '/getAdviceId/' + id, { headers: headersToken });
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

