import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  misHabilidadesDuras: any;
  misHabilidadesBlandas: any;
  addStatus: boolean = false;
  addText: string = '+';
  form: FormGroup;

  constructor(
    private datosPortfolio: PortfolioService,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService
  ) {
    this.form = this.formBuilder.group({
      habilidad: [''],
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      stat_bar: [''],
    });
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.misHabilidadesDuras = data.habilidades_duras;
      this.misHabilidadesBlandas = data.habilidades_blandas;
    });
  }

  showAddForm(): void {
    if (this.addStatus) {
      this.addText = '+';
    } else if (!this.addStatus) {
      this.addText = '-';
    }
    this.addStatus = !this.addStatus;
  }

  get habilidad() {
    return this.form.get('habilidad');
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get nivel() {
    return this.form.get('nivel');
  }
  get stat_bar() {
    return this.form.get('stat_bar');
  }

  agregarHabFormulario(event: Event) {
    event.preventDefault;
    let tipo_hab = '';
    tipo_hab = this.habilidad?.value;
    let postUrl: string = tipo_hab + '/crear';

    let stat_barStyle = '';
    if (this.stat_bar?.value > 60) {
      stat_barStyle = 'level-progress-indicator-good w' + this.stat_bar?.value;
    } else if (this.stat_bar?.value <= 60 && this.stat_bar?.value >= 50) {
      stat_barStyle =
        'level-progress-indicator-medium w' + this.stat_bar?.value;
    } else if (this.stat_bar?.value < 50) {
      stat_barStyle = 'level-progress-indicator-bad w' + this.stat_bar?.value;
    }

    let habilidadObj = {
      nombre: this.nombre?.value,
      nivel: this.nivel?.value,
      stat_bar: stat_barStyle,
    };
    this.portfolioService
      .postPortfolio(habilidadObj, postUrl)
      .subscribe((data) => console.log(data));
    setTimeout(location.reload.bind(location), 800);
  }
}
