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
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }


  getNews(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/getNews', {
      headers: headersToken,
    });
  }

  createNew(news: New, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(news);

    return this._http.post(this.url + '/createNew', params, {
      headers: headersToken,
    });
  }

  getNewId(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/getNewId/' + id, {
      headers: headersToken,
    });
  }

  addCommentNew(token, modelComment): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(modelComment);

    return this._http.put(
      this.url + '/addCommentNew/' + modelComment.idNew,
      params,
      { headers: headersToken }
    );
  }
}
