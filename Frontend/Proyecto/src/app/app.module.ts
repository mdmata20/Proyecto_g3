import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { PagoPeliculasComponent } from './components/pago-peliculas/pago-peliculas.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AgregarPeliculasComponent } from './components/agregar-peliculas/agregar-peliculas.component';
import { UsuarioAdminComponent } from './components/usuario-admin/usuario-admin.component';
import { RegistroUsuarioService } from './Servicios/registro-usuario.service';
import { InventarioPeliculaComponent } from './components/inventario-pelicula/inventario-pelicula.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PagoPeliculasComponent,
    CatalogoComponent,
    AgregarPeliculasComponent,
    UsuarioAdminComponent,
    InventarioPeliculaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RegistroUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
