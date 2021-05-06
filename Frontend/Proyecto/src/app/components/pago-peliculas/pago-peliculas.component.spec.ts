import { async, ComponentFixture, TestBed ,fakeAsync, tick,} from '@angular/core/testing';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

import { PagoPeliculasComponent } from './pago-peliculas.component';
import { AquilerService } from "../../Servicios/aquiler.service";
import { SerciviosPagoService } from "../../ServicioP/sercivios-pago.service";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms/';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { LoginComponent } from "../login/login.component";

describe('PagoPeliculasComponent', () => {
  let component: PagoPeliculasComponent;
  let fixture: ComponentFixture<PagoPeliculasComponent>;
  let httpcliente: HttpClient;
  let service: SerciviosPagoService;
  let servicealquier: AquilerService;

  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoPeliculasComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule.withRoutes([
        { path: 'Catalogo', component: CatalogoComponent},
        { path: 'login', component: LoginComponent}
      ]),FormsModule],
      providers: [SerciviosPagoService, AquilerService],
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(SerciviosPagoService);
    httpcliente = TestBed.inject(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    servicealquier = TestBed.inject(AquilerService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("validar sessionStorage", function() {
    spyOn(window.sessionStorage, 'setItem');
    window.sessionStorage.setItem('correo', 'password');
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('correo', 'password');
  });

  it ('Metodo Mostrad Disponibilidad', async(done) =>{
    expect(component.Verificardor()).toHaveBeenCalled;
    done();
  });

  it ('Metodo GetTotalDolares', async(done) =>{
    expect(component.GetTotalDolares()).toHaveBeenCalled;
    done();
  });

  it ('Metodo GetTotal', async(done) =>{
    expect(component.GetTotal()).toHaveBeenCalled;
    done();
  });

  it('Metodo CapturarModena',  (async(done)  =>{
    expect(component.CapturarMoneda()).toBe(true);
    done();
  }));

  it('Metodo Salir',  (async(done)  =>{
    expect(component.Salir()).toBeDefined;
    done();
  }));

  it('Boton Pagar',  (async(done)  =>{
    //expect(component.CapturarMoneda()).toBe(true);
    expect(document.getElementById('Pagar')).toBeInstanceOf;
    done();
  }));

  it('Boton Cancelar',  async(done)  =>{
    //expect(component.CapturarMoneda()).toBe(true);
    expect(document.getElementById('Cancelar')).toBeInstanceOf;
    done();
  });

  it('Boton Actualizar',  async(done)  =>{
    //expect(component.CapturarMoneda()).toBe(true);
    expect(document.getElementById('Actualizar')).toBeDefined;
    done();
  });

  it('Pruebas Input Numero de Tarjeta (Correcto)',  async(done) => {
    component.Num_Tarjeta = "1234567890123456";
    expect(component.Num_Tarjeta.length).toBe(16);
    done();
  });

  it('Pruebas Input Numero de Tarjeta (Incorrecto)',  async(done) => {
    component.Num_Tarjeta = "484651356130";
    expect(component.Num_Tarjeta.length).toBe(16);
    done();
  });

  it('Pruebas Input Encriptacion Tarjeta',  async(done) => {
    component.Num_Tarjeta = "XXXX56789012XXXX";
    expect(component.Num_Tarjeta).toMatch["[X|x]{4}[0-9]{8}[X|x]{4}"];
    done();
  });

  it('Pruebas Input Nombre ',  async(done) => {
    component.Nombre_Tarjeta = "Prueba Prueba8";
    expect (component.Nombre_Tarjeta.match("[a-zA-Z]"));
    done();
  });

  it('Pruebas Input Fecha ',  async(done) => {
    component.FechaVencimiento = "05/06";
    expect (component.FechaVencimiento.length).toBe(5);
    done();
  });

  it('Pruebas Input Codigo ',  async(done) => {
    component.CodigoVerficacion = "123";
    expect (component.CodigoVerficacion.length).toBe(3);
    done();
  });
  
  it('Pruebas Input Moneda ',  async(done) => {
    component.Moneda1 = "1";
    expect (component.Moneda1).toBe("1");
    done();
  });

});
