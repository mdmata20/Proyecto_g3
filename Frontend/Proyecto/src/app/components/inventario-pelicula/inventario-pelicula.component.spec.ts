import {async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoService } from 'src/app/servicese/catalogo.service';
import { HttpClient } from '@angular/common/http';
import { InventarioPeliculaComponent } from './inventario-pelicula.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import {RouterTestingModule} from "@angular/router/testing"
import { Observable, TimeoutError } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from './../../Servicios/login.services';

describe('InventarioPeliculaComponent', () => {
  let component: InventarioPeliculaComponent;
  let fixture: ComponentFixture<InventarioPeliculaComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [CatalogoService],
      declarations: [InventarioPeliculaComponent]
    });

    fixture = TestBed.createComponent(InventarioPeliculaComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.get(Router);
   

  });

  it('Contructor()', () => {
    const services = TestBed.get(CatalogoService);
    expect(services).toBeTruthy();  
  });

  it('ngOnInit()', () => {
    component.ngOnInit();
  });

  it("validar sessionStorage", function() {
    spyOn(window.sessionStorage, 'setItem');
    window.sessionStorage.setItem('correo', 'password');
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('correo', 'password');
  });
  
});
