
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/login", user);
  }
  getuser(id_user: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/getuser", id_user);
  }
  updateuser(caracteristicas: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/updateuser",caracteristicas);
  }
  getusers(): Observable<any> {
    return this.http.post("http://localhost:3000/api/getusers",[]);
  }
  updatemovie(new_alquiler: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/updatemovie",new_alquiler);
  }
}