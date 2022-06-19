import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  misHabilidadesDuras: any;
  misHabilidadesBlandas: any;

  constructor(private datosPortfolio: PortfolioService) {}

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.misHabilidadesDuras = data.habilidades_duras;
      this.misHabilidadesBlandas = data.habilidades_blandas;
    });
  }
}
