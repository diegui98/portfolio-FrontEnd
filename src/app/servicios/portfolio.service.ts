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

  postEducacion(educacion: any): Observable<any> {
    return this.http.post(this.url + 'educacion/crear', educacion);
  }

  editEducacion(
    id: any,
    escuelaP: string,
    imagenP: string,
    fecha_finP: string,
    descripcionP: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('escuela', escuelaP);
    params = params.append('imagen', imagenP);
    params = params.append('fecha_fin', fecha_finP);
    params = params.append('descripcion', descripcionP);
    return this.http.put(this.url + 'educacion/editar/' + id, null, {
      params: {
        escuela: escuelaP,
        imagen: imagenP,
        fecha_fin: fecha_finP,
        descripcion: descripcionP,
      },
    });
  }
}
