import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { New } from '../models/new.model';

@Injectable({
  providedIn: 'root'
})
export class NewService {


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

createNew(news: New, token): Observable<any>{
  let headersToken = this.headers.set('Authorization', token)
  let params = JSON.stringify(news);

  return this.http.post(this.url + '/createNew', params, {headers: headersToken})
}

editNew(news: New):Observable<any>{
  let params = JSON.stringify(news);
  let headersToken = this.headersVariable.set('Authorization', this.getToken())

  return this.http.put(this.url + '/editNew/' + news._id, params, {headers: headersToken})
}

deleteNew(id:String): Observable<any>{
  let headersToken = this.headersVariable.set('Authorization', this.getToken());
  return this.http.delete(this.url + '/deleteNew/' + id, {headers: headersToken})
}

getNews(token): Observable<any> {
  let headersToken = this.headers.set('Authorization', token)

  return this.http.get(this.url + '/getNews', { headers: headersToken });
}

getNew(token, id): Observable<any> {
  let headersToken = this.headers.set('Authorization', token)

  return this.http.get(this.url + '/getNew/' + id, { headers: headersToken });
}

addCommentNew(token, modelComment): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);
  let params = JSON.stringify(modelComment);

  return this.http.put(
    this.url + '/addCommentNew/' + modelComment.idNew,
    params,
    { headers: headersToken }
  );
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


