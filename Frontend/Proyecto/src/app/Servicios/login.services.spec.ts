
import { async,inject, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

//import { LoginComponent } from './login.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { HttpClient  } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { UsersService } from './login.services';

//import { RegistroComponent } from '../registro/registro.component'
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
const routerSpy = { navigate: jasmine.createSpy('navigate') };
import { NO_ERRORS_SCHEMA} from '@angular/core';


class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
}
class StorageServiceMock {
  setItem = jasmine.createSpy('storageService.setItem');
  getItem = jasmine.createSpy('storageService.getItem');
}

describe('LoginComponent', () => {
  //let component: LoginComponent;
  //let fixture: ComponentFixture<LoginComponent>;
  let service: UsersService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [UsersService]
  }));
  
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],//
     providers: [UsersService,{useClass: HttpClientMock}]//
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.get(HttpTestingController);//
    httpClient = TestBed.inject(HttpClient);//
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
  
  const login = { username: 'eoguamuch94@gmail.com', password: '123' };
  it('Iniciar sesion', () => {
    service.login(login).subscribe(
      (seguro)=>
      {
        expect(seguro).length > 1;
      }
    );
    const req = httpMock.expectOne("http://localhost:3000/api/login");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it("validar sessionStorage", function() {
    spyOn(window.sessionStorage, 'setItem');

    window.sessionStorage.setItem('correo', 'password');

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('correo', 'password');
  })


  const usuario = { id_usuario:2};
  it ('debe obtener el usuario', async(() => {
    const service: UsersService = TestBed.get(UsersService);
    service.getuser(usuario.id_usuario).subscribe(
      (response) => expect(response.json()).not.toBeNull(),
      (error) => fail(error)
    );
    const req = httpMock.expectOne("http://localhost:3000/api/getuser");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  }));


  it ('debe obtener todos los Usuarios', async(() => {
    const service: UsersService = TestBed.get(UsersService);
    service.getusers().subscribe(
      (response) => expect(response.json()).not.toBeNull(),
      (error) => fail(error)
    );
    const req = httpMock.expectOne("http://localhost:3000/api/getusers");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  }));


  const new_alquiler = {new_user: `1`,id_pelicula: `1`,current_user: `2`};
  it ('debe transferir la Movie', async(() => {
    const service: UsersService = TestBed.get(UsersService);
    service.updatemovie(new_alquiler).subscribe(
      (response) => expect(response.json()).not.toBeNull(),
      (error) => fail(error)
    );
    const req = httpMock.expectOne("http://localhost:3000/api/updatemovie");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  }));


  const caracteristicas = {id_usuario: '1', iusuario:'tomuch94', icorreo: 'eo94@gmail.com', ipassword: '123', inombre: 'ed', iapellido: 'guamuch', idpi: '123', iedad: '29'};
  it ('debe actualizar el usuario', async(() => {
    const service: UsersService = TestBed.get(UsersService);
    service.updateuser(caracteristicas).subscribe(
      (response) => expect(response.json()).not.toBeNull(),
      (error) => fail(error)
    );
    const req = httpMock.expectOne("http://localhost:3000/api/updateuser");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  }));


});


