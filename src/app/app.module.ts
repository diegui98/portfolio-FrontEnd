import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { MyInfoComponent } from './componentes/my-info/my-info.component';
import { AcercaDeMiComponent } from './componentes/acerca-de-mi/acerca-de-mi.component';
import { EduhabComponent } from './componentes/eduhab/eduhab.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortfolioService } from './servicios/portfolio.service';
import {
  InterceptorService,
  interceptotProvider,
} from './servicios/interceptor.service';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { IndexComponent } from './componentes/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    MyInfoComponent,
    AcercaDeMiComponent,
    EduhabComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    ExperienciaComponent,
    IniciarSesionComponent,
    PortfolioComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    PortfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    interceptotProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
