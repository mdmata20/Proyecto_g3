import { async,inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { HttpClient  } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { UsersService } from './../../Servicios/login.services';


class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
}
class StorageServiceMock {
  setItem = jasmine.createSpy('storageService.setItem');
  getItem = jasmine.createSpy('storageService.getItem');
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: UsersService;
  let httpMock: HttpTestingController;//
  let httpClient: HttpClient;//

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
  }));


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

  it('Validar Formularios', async () => {

  });

});
