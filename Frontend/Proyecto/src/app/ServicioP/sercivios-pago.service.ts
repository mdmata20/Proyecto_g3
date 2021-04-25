import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class SerciviosPagoService {

  constructor(public Http_pagos: HttpClient) { }


  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  Api_pagos ="http://localhost:3000/BlockBusted/pago"

  //Pagos de un usuario en especifico 
  GetPagos(Id_usuario:string){
    return this.Http_pagos.post(this.Api_pagos, {
      "Id_Usuario": Id_usuario
    },
    { headers: this.headers })
    .pipe(map(data => data));
  }


  MostrarPagos (Id_Alquiler:string, Id_Usuario:string){
    //console.log("alquiler" +Id_Alquiler);
    //console.log("Usuario:"+ Id_Usuario);

    var url = this.Api_pagos +"/mostrarpagos"
    return this.Http_pagos.post(url, {
      "Id_Usuario": Id_Usuario,
      "Id_Alquiler": Id_Alquiler
    },
    { headers: this.headers })
    .pipe(map(data => data));
    
  }

  getCambio(){
    var url= this.Api_pagos +"/cambio";
    return this.Http_pagos.get(url);
  }


  //Insertar un pago 
  InsertarPago(Numero_tarjeta_credito:string, Fecha_expiracion:string, 
    Codigo_verificacion:string, Monto_apagar:string, Modena_apagar:string, fk_alquiler:string){
    
      const url = this.Api_pagos+"/pagar";
      
      return this.Http_pagos.post(url, {
        "alquiler": fk_alquiler,
        "Num_Tarjeta": Numero_tarjeta_credito,
        "Fecha": Fecha_expiracion,
        "Codigo": Codigo_verificacion,
        "Apagar": Monto_apagar,
        "Moneda": Modena_apagar
      },
      { headers: this.headers })
      .pipe(map(data => data));
  }
}
