import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-acerca-de-mi',
  templateUrl: './acerca-de-mi.component.html',
  styleUrls: ['./acerca-de-mi.component.css'],
})
export class AcercaDeMiComponent implements OnInit {
  miPortfolio: any;
  editForm: boolean = false;
  roles!: string[];
  isAdmin = false;

  constructor(
    private datosPortfolio: PortfolioService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.miPortfolio = data.persona[0];
    });
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  //Alterna en mostrar y ocultar el contenido del formulario y las clases del boton de agregar
  showEditAcerca() {
    this.editForm = !this.editForm;
  }

  //Contacta al portfolio.service para el putRequest
  editarAcercaForm(editValue: string) {
    //Creo parametros necesarios, solo la descripcion de Persona
    let parametros = {
      descripcion: editValue,
    };

    //Llamo al servicio dandole la url especifica de edicion de la descripcion y recargo la pag con 0,8seg de delay
    this.datosPortfolio
      .editPortfolio('persona/acerca/editar/', this.miPortfolio.id, parametros)
      .subscribe();
    setTimeout(location.reload.bind(location), 800);
  }
}
