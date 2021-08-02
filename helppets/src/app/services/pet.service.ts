import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model'

@Injectable({
  providedIn: 'root'
})
export class PetService {

  public url:String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor( public http: HttpClient) {
    this.url = GLOBAL.url
   }

   crearMascota(mascota: Pet):Observable<any>{
     let params = JSON.stringify(mascota);
     let token = this.headers.set('Authorization',this.getToken())

    return this.http.post(this.url + '/crearMascota', params, {headers: token })
   }

   mostrarMascotas():Observable<any>{
     let token = this.headers.set('Authorization',this.getToken())

     return this.http.get(this.url + '/mostrarMascotas', {headers: token})
   }

   mostrarMascotasUser(idOrg):Observable<any>{
    return this.http.get(this.url + '/mostrarMascotasUser/'+ idOrg, {headers: this.headers})
   }

   mostrarMascotaId(id: String):Observable<any>{
     return this.http.get(this.url + '/mostrarMascotaId/' + id, {headers: this.headers})
   }

   adoptarMascota(id: String, mascota: Pet): Observable<any>{
     let params = JSON.stringify(mascota);
     let token = this.headers.set('Authorization', this.getToken());

     return this.http.put(this.url + '/adoptarMascota/' + id, params, {headers: token})
   }

   eliminarMacota(idPet):Observable<any>{
    let token = this.headers.set('Authorization' , this.getToken())

     return this.http.delete(this.url + '/eliminarMascota/' + idPet, {headers: token})
   }

   buscarMascotaID(idPet):Observable<any>{
    return this.http.get(this.url + '/buscarMascotaID/'+ idPet, {headers: this.headers} )
   }

   editarMascota(idPet, mascota: Pet):Observable<any>{
     let params = JSON.stringify(mascota)
     let token = this.headers.set('Authorization', this.getToken())

     return this.http.put(this.url + '/editarMascota/' + idPet, params, {headers: token})
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

