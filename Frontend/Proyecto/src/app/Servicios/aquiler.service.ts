import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'//se tiene que importar para que se puesa user el protocolo http(para las consultas)
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AquilerService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders=new HttpHeaders({
    "Content-Type":"application/json"//tipo de dato que se va a estar enviando(json)
  })

  Temp_Id_Alquier:string="";
  Id_Usuario:string ="";
  ID_Movies:number[] = [];


  registrar_alquiler(alpha:string,user:number){
    
    const url="http://34.72.43.127:3000/BlockBusted/Alquiler/alquilar";
 
    this.Temp_Id_Alquier = alpha;  
    return this.http.post(
     url,
     { 
      id_alquiler:alpha,
      usuario:user 
     },
     { headers: this.headers }
   ).pipe(map(data => data));
 
  }

  registrar_pelicula(alpha:string,pelicula:number,user:number){
    this.ID_Movies.push(Number(pelicula));
    const url="http://34.72.43.127:3000/BlockBusted/Alquiler/pelicula";
 
    return this.http.post(
     url,
     { 
      alquiler:alpha,
      movie:pelicula,
      usuario_actual:user
     },
     { headers: this.headers }
   ).pipe(map(data => data));
 
  }

  desabilitar_pelicula(pelicula:number, valor:boolean){
    
    const url="http://34.72.43.127:3000/BlockBusted/Catalogo/" + pelicula;
 
    return this.http.put(
     url,
     { 
      active:valor
     },
     { headers: this.headers }
   ).pipe(map(data => data));
 
  }

  eliminar_pelicula(alpha:string){
    
    const url="http://34.72.43.127:3000/BlockBusted/Alquiler/pelicula/" + alpha;
 
    return this.http.delete(
     url,
     { headers: this.headers }
   ).pipe(map(data => data));
 
  }

  eliminar_alquiler(alpha:string){
    
    const url="http://34.72.43.127:3000/BlockBusted/Alquiler/alquilar/" + alpha;
 
    return this.http.delete(
     url,
     { headers: this.headers }
   ).pipe(map(data => data));
 
  }
}