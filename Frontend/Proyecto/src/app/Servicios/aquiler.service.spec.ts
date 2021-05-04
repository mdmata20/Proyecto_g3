import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { HttpClient } from '@angular/common/http';
import { AquilerService } from './aquiler.service';

describe('AquilerService', () => {
  let service: AquilerService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AquilerService]
    });
    service = TestBed.inject(AquilerService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Constructor()', ()=>{
    const services = TestBed.get(AquilerService);
    expect(services).toBeTruthy();
  });

  it('registrar_alquiler()', () => {

    const respuesta = {message: 'Se creo un Alquiler'};

    service.registrar_alquiler("yoiur3h",1).subscribe(
      (solicitud) =>{
        expect(solicitud).toEqual(respuesta);
      }
    );

    const req = httpMock.expectOne("http://34.72.43.127:3000/BlockBusted/Alquiler/alquilar")
    expect(req.request.method).toBe('POST');
    req.flush(respuesta);
    httpMock.verify();
  });

  it('registrar_pelicula()', () => {

    const respuesta = {message: 'Se alquilo una Pelicula'};

    service.registrar_pelicula("yoiur3h",1,1).subscribe(
      (solicitud) =>{
        expect(solicitud).toEqual(respuesta);
      }
    );

    const req = httpMock.expectOne("http://34.72.43.127:3000/BlockBusted/Alquiler/pelicula")
    expect(req.request.method).toBe('POST');
    req.flush(respuesta);
    httpMock.verify();
  });

  it('desabilitar_pelicula()', () =>{

    const respuesta = {text: 'Update Catalogo de Pelicula'};

    service.desabilitar_pelicula(1, false).subscribe(
      (solicitud) => 
      {
        expect(solicitud).toEqual(respuesta);
      }
    );

    const req = httpMock.expectOne("http://34.72.43.127:3000/BlockBusted/Catalogo/1")
    expect(req.request.method).toBe('PUT');
    req.flush(respuesta);
    httpMock.verify();

  });

  it('delete_pelicula', () => {
    const result = {message: 'Delete Pelicula'};

    service.eliminar_pelicula('yoiur3h').subscribe(
      (solicitud) =>{
        expect(solicitud).toEqual(result);
      }
    );

    const req = httpMock.expectOne("http://34.72.43.127:3000/BlockBusted/Alquiler/pelicula/yoiur3h");
    expect(req.request.method).toBe('DELETE');
    req.flush(result);
    httpMock.verify();
  });

  it('delete_alquiler', () => {
    const result = {message: 'Delete Alquiler'};

    service.eliminar_alquiler('yoiur3h').subscribe(
      (solicitud) =>{
        expect(solicitud).toEqual(result);
      }
    );

    const req = httpMock.expectOne("http://34.72.43.127:3000/BlockBusted/Alquiler/alquilar/yoiur3h");
    expect(req.request.method).toBe('DELETE');
    req.flush(result);
    httpMock.verify();
  });

});
