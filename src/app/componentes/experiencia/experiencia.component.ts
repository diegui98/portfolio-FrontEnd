import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  experienciaList: any;
  addStatus: boolean = false;
  addText: String = '+';
  editFormId: any = 0;
  deleteId: any = 0;
  fileName: string = '';
  form: FormGroup;
  isAdmin = false;

  constructor(
    private datosPortfolio: PortfolioService,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private tokenService: TokenService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.experienciaList = data.experiencia;
    });
    this.isAdmin = this.tokenService.isAdmin();
  }

  //Alterna en mostrar y ocultar el formulario add y cambia el texto del boton de + a -
  showAddForm(): void {
    if (this.addStatus) {
      this.addText = '+';
    } else if (!this.addStatus) {
      this.addText = '-';
    }
    this.addStatus = !this.addStatus;
  }

  //Muestra el formulario edit dependiendo de la id y esconde al resto si fueron abiertos anteriormente
  showEditExperiencia(id: any) {
    if (this.editFormId !== id[0]) {
      this.editFormId = id[0];
      this.deleteId = 0;
    } else if (this.editFormId == id[0]) {
      this.editFormId = 0;
    }
  }

  //Muestra el boton de confirmacion dependiendo de la id y esconde al resto si fueron abiertos anteriormente
  showDeleteExperiencia(id: any) {
    if (this.deleteId !== id[0]) {
      this.deleteId = id[0];
      this.editFormId = 0;
    } else if (this.deleteId == id[0]) {
      this.deleteId = 0;
    }
  }

  //Encuentra el nombre de la imagen en el formulario add, input de 'imagen'
  findImgName(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
  }

  get nombre() {
    return this.form.get('nombre');
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

  //Control de los formularios

  //Contacta al portfolio.service para el postRequest
  agregarExpFormulario(event: Event) {
    event.preventDefault;
    let postUrl: string = 'experiencia/crear';
    let filePath: string = '../assets/' + this.fileName;
    let newForm: any = {
      nombre: this.nombre?.value,
      imagen: filePath,
      fecha_fin: this.fecha_fin?.value,
      descripcion: this.descripcion?.value,
    };
    this.portfolioService.postPortfolio(newForm, postUrl).subscribe();
    setTimeout(location.reload.bind(location), 800);
  }

  //Contacta al portfolio.service para el putRequest
  editarExpFormulario(event: Event) {
    event.preventDefault;
    //Creo los parametros necesarios
    let parametros = {
      nombre: this.nombre?.value,
      fecha_fin: this.fecha_fin?.value,
      descripcion: this.descripcion?.value,
    };
    this.portfolioService
      .editPortfolio('experiencia/editar/', this.editFormId, parametros)
      .subscribe();
    setTimeout(location.reload.bind(location), 800);
  }

  //Contacta al portfolio.service para el deleteRequest
  borrarExperiencia(id: any) {
    this.portfolioService
      .deletePortfolio('experiencia/borrar/' + id)
      .subscribe();
    setTimeout(location.reload.bind(location), 800);
  }
}
