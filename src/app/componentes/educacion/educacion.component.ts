import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

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
    this.isAdmin = this.tokenService.isAdmin();
  }

  // Control de los botones que muestran los formularios

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
  showEditEducacion(id: any) {
    if (this.editFormId !== id[0]) {
      this.editFormId = id[0];
      this.deleteId = 0;
    } else if (this.editFormId == id[0]) {
      this.editFormId = 0;
    }
  }

  //Muestra el boton de confirmacion dependiendo de la id y esconde al resto si fueron abiertos anteriormente
  showDeleteEducacion(id: any) {
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

  // getters

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

  //Control de los formularios

  //Contacta al portfolio.service para el postRequest
  agregarEduFormulario(event: Event) {
    event.preventDefault;
    let postUrl: string = 'educacion/crear';
    let filePath: string = '../assets/' + this.fileName;
    let newForm: any = {
      escuela: this.escuela?.value,
      imagen: filePath,
      fecha_fin: this.fecha_fin?.value,
      descripcion: this.descripcion?.value,
    };
    this.portfolioService.postPortfolio(newForm, postUrl).subscribe(
      (data) => {
        setTimeout(location.reload.bind(location), 500);
      },
      (err) => {
        setTimeout(location.reload.bind(location), 500);
      }
    );
  }

  //Contacta al portfolio.service para el putRequest
  editarEduFormulario(event: Event) {
    event.preventDefault;
    //Creo los parametros necesarios
    let parametros = {
      escuela: this.escuela?.value,
      fecha_fin: this.fecha_fin?.value,
      descripcion: this.descripcion?.value,
    };
    this.portfolioService
      .editPortfolio('educacion/editar/', this.editFormId, parametros)
      .subscribe(
        (data) => {
          setTimeout(location.reload.bind(location), 500);
        },
        (err) => {
          setTimeout(location.reload.bind(location), 500);
        }
      );
  }

  //Contacta al portfolio.service para el deleteRequest
  borrarEducacion(id: any) {
    this.portfolioService.deletePortfolio('educacion/borrar/' + id).subscribe(
      (data) => {
        setTimeout(location.reload.bind(location), 500);
      },
      (err) => {
        setTimeout(location.reload.bind(location), 500);
      }
    );
  }
}
