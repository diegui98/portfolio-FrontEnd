import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  isRegister = false;
  isRegisterFail = false;
  nuevoUsuario!: NuevoUsuario;
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private autenticacionService: AutenticacionService,
    private ruta: Router
  ) {}

  ngOnInit(): void {}

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(
      this.nombre,
      this.nombreUsuario,
      this.email,
      this.password
    );
    this.autenticacionService.nuevo(this.nuevoUsuario).subscribe(
      (data) => {
        this.isRegister = true;
        this.isRegisterFail = false;

        this.ruta.navigate(['/iniciar-sesion']);
      },
      (err) => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.errMsj = err.error;
        console.log(err.error);
      }
    );
  }
}
