import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  url: string = 'http://localhost:8080/portfolio/';
  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get(this.url + 'data');
  }

  postPortfolio(obj: any, postUrl: string): Observable<any> {
    return this.http.post(this.url + postUrl, obj);
  }

  editPortfolio(editUrl: String, id: any, parametros: any): Observable<any> {
    return this.http.put(this.url + editUrl + id, null, {
      params: parametros,
    });
  }

  deletePortfolio(deleteUrl: String): Observable<any> {
    return this.http.delete(this.url + deleteUrl);
  }
}
