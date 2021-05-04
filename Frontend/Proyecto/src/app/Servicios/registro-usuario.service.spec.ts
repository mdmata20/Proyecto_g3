import { TestBed } from '@angular/core/testing';

import { RegistroUsuarioService } from './registro-usuario.service';

//--------------------
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { HttpClient  } from '@angular/common/http';
import { DetalleAlquilerInterface,DetallePagoInterface} from '../models/Catalogo';

const url = 'http://34.72.43.127:3000/BlockBusted';
class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
}

describe('RegistroUsuarioService', () => {
  let service: RegistroUsuarioService;
  let httpMock: HttpTestingController;//
  let httpClient: HttpClient;//

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],//
     providers: [RegistroUsuarioService,{useClass: HttpClientMock}]//
    });

    service = TestBed.inject(RegistroUsuarioService);
    httpMock = TestBed.get(HttpTestingController);//
    httpClient = TestBed.inject(HttpClient);//

  });



    // ********** Prueba 1
it('Constructor()', () => {
   expect(service).toBeTruthy();
 });


    // ********** Prueba 2
it('IngresarUsuario()', () => {
      
  const solicitud: any = {
    nombres:"fredy rafael",
    apellidos:"lemus diaz",
    usuario:"fredy2021",
    edad:21,
    dpi:186549,
    correo:"fredy@hotmail",
    contraseña:"fredy@123" 
    };
    
  const respuesta = { message: 'usuario registrardo con exito' };


  service.registrar_usuario(solicitud.nombres,solicitud.apellido,solicitud.suario,solicitud.edad,solicitud.dpi,solicitud.correo,solicitud.contraseña).subscribe(
    (solicitud) =>
    {
      expect(solicitud).toEqual(respuesta);
    }
  );

  const req = httpMock.expectOne(url +"/usuario");
  expect(req.request.method).toBe('POST');
  req.flush(respuesta);
  httpMock.verify();
});


// ********** Prueba 3
it('Get_AlquileresUsuarios()', () => {
  service.Get_DetalleAlquilerPeli().subscribe(
    (seguro)=>
    {
      expect(seguro).length > 1;
    }
  );

  const req = httpMock.expectOne(url +"/DetalleTransaccion/Alquiler");
  expect(req.request.method).toBe('GET');
  httpMock.verify();
});


// ********** Prueba 4
it('Get_PagosUsuarios()', () => {
  service.Get_DetallePagoPeli().subscribe(
    (seguro)=>
    {
      expect(seguro).length > 1;
    }
  );

  const req = httpMock.expectOne(url +"/DetalleTransaccion/Pago");
  expect(req.request.method).toBe('GET');
  httpMock.verify();
});


// ********** Prueba 5
it('Get_AlquileresUnicoUsuario()', () => {
      
  const solicitud: any = {
    Id_Usuario:2
    };
    
  const respuesta = { message: 'Se obtuvieron los alquileres de un unico usuario' };


  service.Get_MiDetalleAlquilerPeli(solicitud.Id_Usuario).subscribe(
    (solicitud) =>
    {
      expect(solicitud).toEqual(respuesta);
    }
  );

  const req = httpMock.expectOne(url +"/MiDetalleTransaccion/MiAlquiler");
  expect(req.request.method).toBe('POST');
  req.flush(respuesta);
  httpMock.verify();
});


// ********** Prueba 6
it('Get_PagosUnicoUsuario()', () => {
      
  const solicitud: any = {
    Id_Usuario:2
    };
    
  const respuesta = { message: 'Se obtuvieron los pagos de un unico usuario' };


  service.Get_MiDetallePagoPeli(solicitud.Id_Usuario).subscribe(
    (solicitud) =>
    {
      expect(solicitud).toEqual(respuesta);
    }
  );

  const req = httpMock.expectOne(url +"/MiDetalleTransaccion/MiPago");
  expect(req.request.method).toBe('POST');
  req.flush(respuesta);
  httpMock.verify();
});



it("validar sessionStorage", function() {
  spyOn(window.sessionStorage, 'setItem');

  window.sessionStorage.setItem('correo', 'password');

  expect(window.sessionStorage.setItem).toHaveBeenCalledWith('correo', 'password');
})



});
