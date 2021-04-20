import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { PagoPeliculasComponent } from './components/pago-peliculas/pago-peliculas.component';

import {FormsModule} from '@angular/forms'
import {HttpClient, HttpClientModule } from '@angular/common/http'//se importo tambien, no venia por defecto , para la comunicacion con la api

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PagoPeliculasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule//se importo , no venia por defecto
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
