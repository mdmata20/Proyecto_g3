import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent  } from "../app/components/usuario/usuario.component";
import { LoginComponent } from "../app/components/login/login.component";
import { HomeComponent } from "../app/components/home/home.component";
import { RegistroComponent } from "../app/components/registro/registro.component";
import { PagoPeliculasComponent } from "../app/components/pago-peliculas/pago-peliculas.component";
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
    
  },
  {
    path: "miperfil",
    component: UsuarioComponent
  },
  {
    path: "ho",
    component: HomeComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  },{
    path: "pagopeliculas",
    component: PagoPeliculasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
