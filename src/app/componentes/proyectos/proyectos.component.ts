import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  misProyectos: any;
  showImg: any = 0;
  viewAll: string = 'Mostrar Todo';
  addStatus: boolean = false;
  addText: string = '+';
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
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      tecnologiasUsadas: ['', [Validators.required]],
      caracteristicasNotables: ['', [Validators.required]],
      github: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.misProyectos = data.proyectos;
    });
    this.isAdmin = this.tokenService.isAdmin();
  }

  //Boton de github, abre nueva pestaña
  newTab(link: string) {
    window.open(link, '_blank');
  }

  //Alterna en mostrar y ocultar las imagenes
  imagenesToggle(id: any): void {
    if (this.showImg !== id[0]) {
      this.showImg = id[0];
      this.viewAll = 'Ocultar Todo';
    } else {
      this.showImg = 0;
      this.viewAll = 'Mostrar Todo';
    }
    if (id[0] !== -1) {
      this.viewAll = 'Mostrar Todo';
    }
  }

  //Alterna en mostrar y ocultar el formulario add y cambia el texto del boton de + a -
  showAddForm() {
    if (this.addStatus) {
      this.addText = '+';
    } else if (!this.addStatus) {
      this.addText = '-';
    }
    this.addStatus = !this.addStatus;
  }

  //Muestra el formulario edit dependiendo de la id y esconde al resto si fueron abiertos anteriormente
  showEditProyecto(id: any) {
    if (this.editFormId !== id[0]) {
      this.editFormId = id[0];
      this.deleteId = 0;
    } else if (this.editFormId == id[0]) {
      this.editFormId = 0;
    }
  }

  //Muestra el boton de confirmacion dependiendo de la id y esconde al resto si fueron abiertos anteriormente
  showDeleteProyecto(id: any) {
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

  //getters

  get nombre() {
    return this.form.get('nombre');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
  get imagen() {
    return this.form.get('imagen');
  }
  get tecnologiasUsadas() {
    return this.form.get('tecnologiasUsadas');
  }
  get caracteristicasNotables() {
    return this.form.get('caracteristicasNotables');
  }
  get github() {
    return this.form.get('github');
  }

  //Control de los formularios

  //Contacta al portfolio.service para el postRequest
  agregarProyectoFormulario(event: Event) {
    event.preventDefault;
    let postUrl: string = 'proyectos/crear';
    let filePath: string = '../assets/' + this.fileName;
    let newForm: any = {
      nombre: this.nombre?.value,
      descripcion: this.descripcion?.value,
      imagen: filePath,
      tecnologiasUsadas: this.tecnologiasUsadas?.value,
      caracteristicasNotables: this.caracteristicasNotables?.value,
      github: this.github?.value,
    };
    this.portfolioService.postPortfolio(newForm, postUrl).subscribe();
    setTimeout(location.reload.bind(location), 800);
  }

  //Contacta al portfolio.service para el putRequest
  editarProyectoFormulario(event: Event) {
    event.preventDefault;
    //Creo los parametros necesarios
    let parametros = {
      nombre: this.nombre?.value,
      descripcion: this.descripcion?.value,
      tecnologiasUsadas: this.tecnologiasUsadas?.value,
      caracteristicasNotables: this.caracteristicasNotables?.value,
      github: this.github?.value,
    };
    this.portfolioService
      .editPortfolio('proyectos/editar/', this.editFormId, parametros)
      .subscribe();
    setTimeout(location.reload.bind(location), 800);
  }

  //Contacta al portfolio.service para el deleteRequest
  borrarProyecto(id: any) {
    this.portfolioService.deletePortfolio('proyectos/borrar/' + id).subscribe();
    setTimeout(location.reload.bind(location), 800);
  }
}
