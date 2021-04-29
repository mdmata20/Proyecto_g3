import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { HttpClient } from '@angular/common/http';
import { CatalogoService } from './catalogo.service';
import {Catalogo} from '../models/Catalogo';
import { ignoreElements } from 'rxjs/operators';

describe('CatalogoService', () => {
  let service: CatalogoService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatalogoService]
    });

    service = TestBed.inject(CatalogoService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  it('Contructor()', ()=>{
    const services = TestBed.get(CatalogoService);
    expect(services).toBeTruthy();
  });

  it('getCatalogo()', () => {
    service.getCatalogo().subscribe(
      (catalogo)=>
      {
        expect(catalogo).length >1;
      }
    );

    const req = httpMock.expectOne(service.API_URL);
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

  it('deleteCatalogo()', () => {
    const result = {message: 'Catalogo eliminado'};

    service.deleteCatalogo('1').subscribe(
      (solicitud) =>{
        expect(solicitud).toEqual(result);
      }
    );

    const req = httpMock.expectOne(service.API_URL + '/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(result);
    httpMock.verify();
  });

  it('update()', () =>{
    const solicitud1: Catalogo ={
      id_Movie: 1,
      name: "Pelicula2",
      image: "URL2",
      ChargeRate: 10.75,
      active: "true",
    };

    const respuesta = { message: "Catalogo Actualizado"};

    service.update('1',solicitud1).subscribe(
      (solicitud) => 
      {
        expect(solicitud).toEqual(solicitud,solicitud1);
      }
    );

    const req = httpMock.expectOne(service.API_URL + '/1')
    expect(req.request.method).toBe('PUT');
    req.flush(respuesta);
    httpMock.verify();

  });

  it('Inventario()', () => {
    const result = { message: 'Inventario lleno'};
    service.Inventario().subscribe(
      (inventario) => {
        expect(inventario).toEqual(result);
      }
    );

    const req = httpMock.expectOne(service.API_URL + "/" + sessionStorage.getItem('id_usuario'));
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

});
