import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  isLogginFailed: boolean = false;

  constructor(
    private tokenService: TokenService,
    private autenticacionService: AutenticacionService,
    private ruta: Router
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.autenticacionService.login(this.loginUsuario).subscribe(
      (data) => {
        this.tokenService.setToken(data.token);
        this.ruta.navigate(['/inicio']);
      },
      (err) => {
        this.isLogginFailed = true;
      }
    );
  }
}
