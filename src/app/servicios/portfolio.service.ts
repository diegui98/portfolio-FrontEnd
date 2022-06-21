import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  url: string = 'http://localhost:8080/portfolio/api/';
  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get('../../assets/data/Data.json');
    // this.url + "persona"
  }
}
