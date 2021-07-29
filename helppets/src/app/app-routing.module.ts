import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlberguepersonalComponent } from './components/alberguepersonal/alberguepersonal.component';
import { AlberguesComponent } from './components/albergues/albergues.component';
import { HomeComponent } from './components/home/home.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'registrar', component : RegistroComponent},
  { path: 'registrar/:state', component : RegistroComponent},
  { path: 'albergues', component: AlberguesComponent },
  { path: 'mascotas/:idAlbergue', component: MascotasComponent },
  { path: 'alberguepersonal', component: AlberguepersonalComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
