import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent  } from "../app/components/usuario/usuario.component";
import { LoginComponent } from "../app/components/login/login.component";
import { RegistroComponent } from "../app/components/registro/registro.component";
import { PagoPeliculasComponent } from "../app/components/pago-peliculas/pago-peliculas.component";
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { UsuarioAdminComponent } from './components/usuario-admin/usuario-admin.component';
import { InventarioPeliculaComponent } from './components/inventario-pelicula/inventario-pelicula.component';
import { MisTransaccionesComponent } from './components/mis-transacciones/mis-transacciones.component';
const routes: Routes = [
  {
    pathMatch: 'full',
    redirectTo: '/login',
    path: '',
  },
  {
    path: "miperfil",
    component: UsuarioComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  },{
    path: "pagopeliculas",
    component: PagoPeliculasComponent
  },{
    path: 'Catalogo',
    component: CatalogoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  } ,
  {
    path: 'UsuarioAdmin',
    component: UsuarioAdminComponent
  } ,
  {
    path: 'InventarioPelicula',
    component: InventarioPeliculaComponent
  },
  {
    path: 'MisTransacciones',
    component: MisTransaccionesComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
