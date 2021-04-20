import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  API_URL = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  getConexion(){
    return this.http.get(`${this.API_URL}`)
  }
}
