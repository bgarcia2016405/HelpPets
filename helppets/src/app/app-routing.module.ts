import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdviceComponent } from './components/advice/advice.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'registrar', component : RegistroComponent},
  { path: 'registrar/:state', component : RegistroComponent},
  { path: 'consejos', component: AdviceComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
