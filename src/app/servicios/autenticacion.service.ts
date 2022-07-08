import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  url = environment.authUrl;
  constructor(private http: HttpClient) {}

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.url + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.url + 'login', loginUsuario);
  }
}
