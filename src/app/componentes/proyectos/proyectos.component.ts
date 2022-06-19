import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  misProyectos: any;
  status: boolean = true;
  buttonText: String = 'Mostrar imagenes';

  constructor(private datosPortfolio: PortfolioService) {}

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.misProyectos = data.proyectos;
    });
  }

  buttonToggle(): void {
    if (this.status) {
      this.buttonText = 'Ocultar imagenes';
    } else {
      this.buttonText = 'Mostrar imagenes';
    }
    this.status = !this.status;
  }
}
