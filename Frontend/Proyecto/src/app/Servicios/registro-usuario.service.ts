import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'//se tiene que importar para que se puesa user el protocolo http(para las consultas)
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders=new HttpHeaders({
    "Content-Type":"application/json"//tipo de dato que se va a estar enviando(json)
  })



  registrar_usuario(nombre:string,apellido:string,usuario:string,edad:number,dpi:number,correo:string,contraseña:string){//hara la peticion al servidor hecho con nodejs
    //return this.http.post<any>('http://localhost:3000/signup',user);//se envia a la BD los datos que trae user
    
    const url="http://localhost:3000/BlockBusted/usuario";
 
    return this.http.post(
     url,
     { 
      nombres:nombre,
      apellidos:apellido,
      usuario:usuario,
      edad:edad,
      dpi:dpi,
      correo:correo,
      contraseña:contraseña 
     },
     { headers: this.headers }
   ).pipe(map(data => data));
 
  }




}
