import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public url;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  getMyServices(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)

    return this.http.get(this.url + '/getMyServices', { headers: headersToken });
  }

  getServiceId(token, id): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)

    return this.http.get(this.url + '/getServiceId/' + id, { headers: headersToken });
  }

  createService(service: Service, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(service);

    return this.http.post(this.url + '/createService', params, {headers: headersToken})
  }
  
  editService(service: Service, id): Observable<any>{
    let params = JSON.stringify(service);
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.put(this.url + '/editService/' + id, params, { headers: headersToken})
  }

  deleteService(id){
    let headersToken = this.headers.set('Authorization', this.getToken());
    
    return this.http.delete(this.url + '/deleteService/' + id, {headers: headersToken});
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
