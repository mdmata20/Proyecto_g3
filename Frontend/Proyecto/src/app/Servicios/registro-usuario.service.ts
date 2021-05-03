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
    //return this.http.post<any>('http://34.72.43.127:3000/signup',user);//se envia a la BD los datos que trae user
    
    const url="http://34.72.43.127:3000/BlockBusted/usuario";
 
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


  //es para la parte del admin para ver los detalles de las transacciones
  Get_DetalleAlquilerPeli(){
    const url="http://34.72.43.127:3000/BlockBusted/DetalleTransaccion/Alquiler";
    return this.http.get(url);
  }

  Get_DetallePagoPeli(){
    const url="http://34.72.43.127:3000/BlockBusted/DetalleTransaccion/Pago";
    return this.http.get(url);
  }

  /*return this.Http_pagos.post(this.Api_pagos, {
    "Id_Usuario": Id_usuario
  },
  { headers: this.headers })
  .pipe(map(data => data));*/

  //es para un usuario unico para ver sus detalles de sus transacciones
  Get_MiDetalleAlquilerPeli(iduser:any){
    const url="http://34.72.43.127:3000/BlockBusted/MiDetalleTransaccion/MiAlquiler";
    return this.http.post(url,{
      "Id_Usuario": iduser
    },
    { headers: this.headers }).pipe(map(data => data));
    
  }

  Get_MiDetallePagoPeli(iduser:any){
    const url="http://34.72.43.127:3000/BlockBusted/MiDetalleTransaccion/MiPago";
    return this.http.post(url,{
      "Id_Usuario": iduser
    },
    { headers: this.headers }).pipe(map(data => data));

  }


}
