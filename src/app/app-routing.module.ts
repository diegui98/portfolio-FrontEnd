import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './componentes/index/index.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GuardGuard } from './servicios/guard.guard';

const routes: Routes = [
  {
    path: 'portfolio',
    component: PortfolioComponent,
    canActivate: [GuardGuard],
    data: { expectedRol: ['admin', 'user'] },
  },
  { path: 'inicio', component: IndexComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
