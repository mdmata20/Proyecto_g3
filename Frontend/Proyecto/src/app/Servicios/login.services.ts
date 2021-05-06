
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { API_URI } from "./conn";
import { response } from "express";

export interface UserLoginBody {
  email: string;
  password: string;
}
@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}
/*
  login(user: any): Observable<any> {
    return this.http.post(API_URI+"/api/login", user);
  }
*/

  login(userloginBody: UserLoginBody): Promise<any> {
    const path = '/api/login';
    return new Promise((resolve, reject) => {
      this.http.post(API_URI + path, userloginBody)
        .toPromise()
        .then((res: BaseResponse) => {
          //console.log(userloginBody);
          //console.log(res);
           resolve(res);
        }).catch((err) => {
          reject(err.error.message);
        });
    });
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

export interface BaseResponse {
  text: string;
  id_usuario: string;
}