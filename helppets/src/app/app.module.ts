import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdviceComponent } from './components/advice/advice.component';

import { HttpClientModule } from '@angular/common/http';
import { DetalleConsejoComponent } from './components/detalle-consejo/detalle-consejo.component';
import { NewComponent } from './components/new/new.component';
import { DetalleNoticiaComponent } from './components/detalle-noticia/detalle-noticia.component';
import { MiVeterinariaComponent } from './components/mi-veterinaria/mi-veterinaria.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { VeterinariasComponent } from './components/veterinarias/veterinarias.component';

import { AlberguesComponent } from './components/albergues/albergues.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { AlberguepersonalComponent } from './components/alberguepersonal/alberguepersonal.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { CitasComponent } from './components/citas/citas.component';
import { AdopcionComponent } from './components/adopcion/adopcion.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegistroComponent,
    AdviceComponent,
    DetalleConsejoComponent,
    NewComponent,
    DetalleNoticiaComponent,
    AlberguesComponent,
    MascotasComponent,
    AlberguepersonalComponent,
    AdministracionComponent,
    CitasComponent,
    MiVeterinariaComponent,
    VeterinariasComponent
    AdopcionComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
