import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { HttpClient } from '@angular/common/http';
import { ConexionService } from './conexion.service';

describe('ConexionService', () => {
  let service: ConexionService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConexionService]
    });

    service = TestBed.inject(ConexionService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('conexion()', () => {
    
    const result = {text: 'API is /Blockusted/usuario'};

    service.getConexion().subscribe(
      (solicitud) =>
      {
        expect(solicitud).toEqual(result);
      }
    );

    const req = httpMock.expectOne(service.API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(result);
    httpMock.verify();

  });
});
