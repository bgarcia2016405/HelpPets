import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MiVeterinariaComponent } from './components/mi-veterinaria/mi-veterinaria.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VeterinariasComponent } from './components/veterinarias/veterinarias.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'registrar', component : RegistroComponent},
  { path: 'registrar/:state', component : RegistroComponent},
  { path: 'miVeterinaria', component : MiVeterinariaComponent},
  { path: 'veterinarias', component: VeterinariasComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
