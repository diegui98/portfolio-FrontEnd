import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

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
  editFormIdD: any = 0;
  editFormIdB: any = 0;
  deleteIdD: any = 0;
  deleteIdB: any = 0;
  form: FormGroup;
  isAdmin = false;

  constructor(
    private datosPortfolio: PortfolioService,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private tokenService: TokenService
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

  //Muestra el formulario edit dependiendo de la id y el tipo de la habilidad y esconde al resto si fueron abiertos anteriormente
  showEditHabilidad(id: any, tipo: string) {
    if (tipo == 'D') {
      if (this.editFormIdD !== id[0]) {
        this.editFormIdD = id[0];
        this.deleteIdD = 0;
        this.deleteIdB = 0;
        this.editFormIdB = 0;
      } else if (this.editFormIdD == id[0]) {
        this.editFormIdD = 0;
      }
    } else if (tipo == 'B') {
      if (this.editFormIdB !== id[0]) {
        this.editFormIdB = id[0];
        this.deleteIdD = 0;
        this.deleteIdB = 0;
        this.editFormIdD = 0;
      } else if (this.editFormIdB == id[0]) {
        this.editFormIdB = 0;
      }
    }
  }

  //Muestra el boton de confirmacion dependiendo de la id y el tipo de la habilidad y esconde al resto si fueron abiertos anteriormente
  showDeleteHabilidad(id: any, tipo: string) {
    if (tipo == 'D') {
      if (this.deleteIdD !== id[0]) {
        this.deleteIdD = id[0];
        this.editFormIdD = 0;
        this.editFormIdB = 0;
        this.deleteIdB = 0;
      } else if (this.deleteIdD == id[0]) {
        this.deleteIdD = 0;
      }
    } else if (tipo == 'B') {
      if (this.deleteIdB !== id[0]) {
        this.deleteIdB = id[0];
        this.editFormIdD = 0;
        this.editFormIdB = 0;
        this.deleteIdD = 0;
      } else if (this.deleteIdB == id[0]) {
        this.deleteIdB = 0;
      }
    }
  }

  // getters

  get nombre() {
    return this.form.get('nombre');
  }
  get nivel() {
    return this.form.get('nivel');
  }
  get stat_bar() {
    return this.form.get('stat_bar');
  }
  get habilidad() {
    return this.form.get('habilidad');
  }

  //Control de los formularios

  //Contacta al portfolio.service para el postRequest
  agregarHabFormulario(event: Event) {
    //Creo el url dependiendo del tipo de habilidad seleccionado en el formulario
    event.preventDefault;
    let tipo_hab = '';
    tipo_hab = this.habilidad?.value;
    let postUrl: string = tipo_hab + '/crear';

    //Le agrego el resto de la clase css necesaria dependiendo el valor seleccionado en el formulario
    let stat_barStyle = '';
    if (this.stat_bar?.value > 60) {
      stat_barStyle = 'level-progress-indicator-good w' + this.stat_bar?.value;
    } else if (this.stat_bar?.value <= 60 && this.stat_bar?.value >= 50) {
      stat_barStyle =
        'level-progress-indicator-medium w' + this.stat_bar?.value;
    } else if (this.stat_bar?.value < 50) {
      stat_barStyle = 'level-progress-indicator-bad w' + this.stat_bar?.value;
    }

    //Creo el json con el nuevo objeto y sus atributos, y con la nueva var stat_barStyle
    let habilidadObj = {
      nombre: this.nombre?.value,
      nivel: this.nivel?.value,
      stat_bar: stat_barStyle,
    };

    //LLamo al portfolio.service y recargo la pag con 0,8seg de delay
    this.portfolioService.postPortfolio(habilidadObj, postUrl).subscribe();
    setTimeout(location.reload.bind(location), 800);
  }

  //Contacta al portfolio.service para el putRequest
  editarHabFormulario(event: Event, tipo: string) {
    event.preventDefault;

    //Creo el url para el putRequest dependiendo su tipo de habilidad y con su id

    let editUrl = '';
    let editCurrentId = 0;
    if (tipo == 'D') {
      editUrl = 'habilidades_duras/editar/';
      editCurrentId = this.editFormIdD;
    } else if (tipo == 'B') {
      editUrl = 'habilidades_blandas/editar/';
      editCurrentId = this.editFormIdB;
    }

    //Le agrego el resto de la clase css necesaria dependiendo el valor seleccionado en el formulario

    let stat_barStyle = '';
    if (this.stat_bar?.value > 60) {
      stat_barStyle = 'level-progress-indicator-good w' + this.stat_bar?.value;
    } else if (this.stat_bar?.value <= 60 && this.stat_bar?.value >= 50) {
      stat_barStyle =
        'level-progress-indicator-medium w' + this.stat_bar?.value;
    } else if (this.stat_bar?.value < 50) {
      stat_barStyle = 'level-progress-indicator-bad w' + this.stat_bar?.value;
    }

    //Creo el json con el nuevo objeto y sus atributos, y con la nueva var stat_barStyle

    let parametros = {
      nombre: this.nombre?.value,
      nivel: this.nivel?.value,
      stat_bar: stat_barStyle,
    };

    //LLamo al portfolio.service y recargo la pag con 0,8seg de delay
    this.portfolioService
      .editPortfolio(editUrl, editCurrentId, parametros)
      .subscribe();
    setTimeout(location.reload.bind(location), 800);
  }

  //Contacta al portfolio.service para el deleteRequest
  borrarHab(id: any, tipo: string) {
    //Creo el url para el putRequest dependiendo su tipo de habilidad y con su id
    let deleteUrl = '';
    if (tipo == 'D') {
      deleteUrl = 'habilidades_duras/borrar/';
    } else if (tipo == 'B') {
      deleteUrl = 'habilidades_blandas/borrar/';
    }

    //LLamo al portfolio.service y recargo la pag con 0,8seg de delay
    this.portfolioService.deletePortfolio(deleteUrl + id).subscribe();
    setTimeout(location.reload.bind(location), 800);
  }
}
