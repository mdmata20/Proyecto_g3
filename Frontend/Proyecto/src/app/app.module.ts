import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PagoPeliculasComponent } from './components/pago-peliculas/pago-peliculas.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { UsuarioAdminComponent } from './components/usuario-admin/usuario-admin.component';
import { RegistroUsuarioService } from './Servicios/registro-usuario.service';
import { InventarioPeliculaComponent } from './components/inventario-pelicula/inventario-pelicula.component';
import { MisTransaccionesComponent } from './components/mis-transacciones/mis-transacciones.component';

// Introduce the form module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    RegistroComponent,
    PagoPeliculasComponent,
    CatalogoComponent,
    UsuarioAdminComponent,
    InventarioPeliculaComponent,
    MisTransaccionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // Import form module
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [RegistroUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
