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
  editFormId: any = 0;
  deleteId: any = 0;
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

  showAddForm(): void {
    if (this.addStatus) {
      this.addText = '+';
    } else if (!this.addStatus) {
      this.addText = '-';
    }
    this.addStatus = !this.addStatus;
  }

  showEditEducacion(id: any) {
    if (this.editFormId !== id[0]) {
      this.editFormId = id[0];
      this.deleteId = 0;
    } else if (this.editFormId == id[0]) {
      this.editFormId = 0;
    }
  }

  showDeleteEducacion(id: any) {
    if (this.deleteId !== id[0]) {
      this.deleteId = id[0];
      this.editFormId = 0;
    } else if (this.deleteId == id[0]) {
      this.deleteId = 0;
    }
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

  agregarEduFormulario(event: Event) {
    event.preventDefault;
    let postUrl: string = 'educacion/crear';
    this.portfolioService
      .postPortfolio(this.form.value, postUrl)
      .subscribe((data) => console.log(data));
    setTimeout(location.reload.bind(location), 800);
  }

  editarEduFormulario(event: Event) {
    event.preventDefault;
    let parametros = {
      escuela: this.escuela?.value,
      imagen: this.imagen?.value,
      fecha_fin: this.fecha_fin?.value,
      descripcion: this.descripcion?.value,
    };
    this.portfolioService
      .editPortfolio('educacion/editar/', this.editFormId, parametros)
      .subscribe((data) => console.log(data));
    setTimeout(location.reload.bind(location), 800);
  }

  borrarEducacion(id: any) {
    this.portfolioService.deletePortfolio('educacion/borrar/' + id).subscribe();
    setTimeout(location.reload.bind(location), 800);
  }
}
