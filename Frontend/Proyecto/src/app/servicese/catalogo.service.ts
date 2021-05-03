import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Catalogo } from '../models/Catalogo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  
  API_URL = 'http://34.72.43.127:3000/BlockBusted/Catalogo'

  constructor(private http: HttpClient) { }

  getCatalogo(){
    return this.http.get(`${this.API_URL}`)
  }

  deleteCatalogo(id_Movie: string){
    return this.http.delete(`${this.API_URL}/${id_Movie}`)
  }

  update(id_Movie: string, updateCatalogo: Catalogo): Observable<Catalogo>{
    return this.http.put(`${this.API_URL}/${id_Movie}`, updateCatalogo)
  }

  Inventario(){
    return this.http.get(`${this.API_URL}/${sessionStorage.getItem('id_usuario')}`)
  }
}
