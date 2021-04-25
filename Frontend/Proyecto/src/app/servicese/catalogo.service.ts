import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Catalogo } from '../models/Catalogo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  

  API_URL = 'http://localhost:3000/BlockBusted/Catalogo'

  constructor(private http: HttpClient) { }

  getConexion(){
    return this.http.get(`${this.API_URL}`)
  }


  getCatalogo1(){
    let heades = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get(this.API_URL, {
      headers: heades
    });
  }

  getCatalogo(){
    return this.http.get(`${this.API_URL}`)
  }

  deleteCatalogo(id_Movie: string){
    return this.http.delete(`${this.API_URL}/catalogo/${id_Movie}`)
  }

  saveCatalogo(catalogo: Catalogo){
    return this.http.post(`${this.API_URL}/catalogo/`, catalogo);
  }

  update(id_Movie: string, updateCatalogo: Catalogo): Observable<Catalogo>{
    return this.http.put(`${this.API_URL}/catalogo/${id_Movie}`, updateCatalogo)
  }

  Inventario(){
    return this.http.get(`${this.API_URL}/${sessionStorage.getItem('id_usuario')}`)
  }
}
