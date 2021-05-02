
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { API_URI } from "./conn";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(API_URI+"/api/login", user);
  }
  getuser(id_user: any): Observable<any> {
    return this.http.post(API_URI+"/api/getuser", id_user);
  }
  updateuser(caracteristicas: any): Observable<any> {
    return this.http.post(API_URI+"/api/updateuser",caracteristicas);
  }
  getusers(): Observable<any> {
    return this.http.post(API_URI+"/api/getusers",[]);
  }
  updatemovie(new_alquiler: any): Observable<any> {
    return this.http.post(API_URI+"/api/updatemovie",new_alquiler);
  }
}