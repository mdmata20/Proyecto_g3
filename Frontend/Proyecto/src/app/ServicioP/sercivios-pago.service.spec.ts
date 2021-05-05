import { TestBed } from '@angular/core/testing';
import { SerciviosPagoService } from './sercivios-pago.service';
import {HttpClient} from '@angular/common/http'
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('SerciviosPagoService', () => {
  let service: SerciviosPagoService;
  let httpcliente: HttpClient;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SerciviosPagoService]
    });
    service = TestBed.inject(SerciviosPagoService);
    //httpcliente = TestBed.inject(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('Constructor()', ()=> {
    const services = TestBed.get(SerciviosPagoService);
    expect(services).toBeTruthy();
  });

    //Funcion get Tipo de cambio 
    it ('Get Tipo de Cambio (Servicio)', ()=>{
      service.getCambio().subscribe((res)=>{
        expect(res).length > 1;
      });
      const req = httpMock.expectOne(service.Api_pagos + '/cambio');
      expect(req.request.method).toBe('GET');
      httpMock.verify();
    })

    //Funcion Mostrar Pagos 
    it ('POST Mostrar Pagos (Servicio)', ()=>{
      service.MostrarPagos("cQZWjAfs","4").subscribe((res)=>{
        expect(res).length > 1;
      });
      const req = httpMock.expectOne(service.Api_pagos + '/mostrarpagos');
      expect(req.request.method).toBe('POST');
      httpMock.verify();
    })

    //Funcion Agregar  Pago 
    it ('POST AGREGAR PAGO (Servicio)', ()=>{
      service.InsertarPago("XXXX56789012XXXX","05/09","123","800.00","2","cQZWjAfs").subscribe((res)=>{
        expect(res).length > 1;
      });
      const req = httpMock.expectOne(service.Api_pagos + '/pagar');
      expect(req.request.method).toBe('POST');
      httpMock.verify();
    })

});
