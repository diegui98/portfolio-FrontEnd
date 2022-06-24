import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  educacionList: any;
  addStatus: boolean = false;
  addText: String = '+';
  editFormId: any = '';
  form: FormGroup;

  constructor(
    private datosPortfolio: PortfolioService,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService
  ) {
    this.form = this.formBuilder.group({
      escuela: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.educacionList = data.educacion;
    });
  }

  deleteEducacion() {}

  showEditEducacion(id: any) {
    if (this.editFormId !== id[0]) {
      this.editFormId = id[0];
    } else if (this.editFormId == id[0]) {
      this.editFormId = '';
    }
  }

  showAddForm(): void {
    if (this.addStatus) {
      this.addText = '+';
    } else if (!this.addStatus) {
      this.addText = '-';
    }
    this.addStatus = !this.addStatus;
  }

  get escuela() {
    return this.form.get('escuela');
  }

  get imagen() {
    return this.form.get('imagen');
  }

  get fecha_fin() {
    return this.form.get('fecha_fin');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }

  editarEduFormulario(event: Event) {
    event.preventDefault;
    this.portfolioService
      .editEducacion(
        this.editFormId,
        this.escuela?.value,
        this.imagen?.value,
        this.fecha_fin?.value,
        this.descripcion?.value
      )
      .subscribe((data) => console.log(data));
    window.location.reload();
  }

  agregarEduFormulario(event: Event) {
    event.preventDefault;
    this.portfolioService
      .postEducacion(this.form.value)
      .subscribe((data) => console.log(data));
    window.location.reload();
  }
}
