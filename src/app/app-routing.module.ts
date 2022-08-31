import { EnviarVagaComponent } from './enviar-vaga/enviar-vaga.component';
import { VagaComponent } from './vaga/vaga.component';
import { VagasComponent } from './vagas/vagas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { HomeComponent } from './home/home.component';
import { EnviarCvComponent } from './enviar-cv/enviar-cv.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'vagas', component: VagasComponent },
  { path: 'vaga/:id', component: VagaComponent },
  { path: 'enviar-cv', component: EnviarCvComponent },
  { path: 'enviar-vaga', component: EnviarVagaComponent },
  { path: '*', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
