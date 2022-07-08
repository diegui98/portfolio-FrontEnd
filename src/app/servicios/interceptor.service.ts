import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, concatMap, Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { JwtDTO } from '../models/jwt-dto';
import { AutenticacionService } from './autenticacion.service';

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AutenticacionService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
          return this.authService.refresh(dto).pipe(
            concatMap((data: any) => {
              console.log('refreshing...');
              this.tokenService.setToken(data.token);
              intReq = this.addToken(req, data.token);
              return next.handle(intReq);
            })
          );
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}

export const interceptotProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];
