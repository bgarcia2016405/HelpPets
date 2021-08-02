import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { AlberguepersonalComponent } from './components/alberguepersonal/alberguepersonal.component';
import { AlberguesComponent } from './components/albergues/albergues.component';
import { HomeComponent } from './components/home/home.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { MiVeterinariaComponent } from './components/mi-veterinaria/mi-veterinaria.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CitasComponent } from './components/citas/citas.component';
import { VeterinariasComponent } from './components/veterinarias/veterinarias.component';
import { VeterinariaComponent } from './components/veterinaria/veterinaria.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'registrar', component : RegistroComponent},
  { path: 'registrar/:state', component : RegistroComponent},
  { path: 'albergues', component: AlberguesComponent },
  { path: 'mascotas/:idAlbergue', component: MascotasComponent },
  { path: 'alberguepersonal', component: AlberguepersonalComponent },
  { path: 'administrar', component: AdministracionComponent},
  { path: 'citas', component: CitasComponent},
  { path: 'miVeterinaria', component : MiVeterinariaComponent},
  { path: 'veterinarias', component: VeterinariasComponent},
  { path: 'veterinaria/:idVeterinaria', component: VeterinariaComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
