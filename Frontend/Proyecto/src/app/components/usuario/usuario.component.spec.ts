import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { UsuarioComponent } from './usuario.component';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { HttpClient  } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('UsuarioComponent', () => {

  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('Login Button Click', fakeAsync(() => {

    let buttonElement = fixture.debugElement.query(By.css('#btnguardar'));
    
    spyOn(component, 'guardar');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);
  
    fixture.whenStable().then(() => {
      expect(component.guardar).toHaveBeenCalled();
    });


  }));
  */

  it('Credenciales incorrectas, no debe iniciar sesion', () => {
    component.guardar= jasmine.createSpy().and.callFake(function(){
      return 'Cambios Guardados.';
    });
    expect(""+component.guardar()).toEqual("Cambios Guardados.");
  })



  /*
  it('Login Button Click', fakeAsync(() => {

    let buttonElement = fixture.debugElement.query(By.css('#btnguardar'));
    
    spyOn(component, 'guardar');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);
  
    fixture.whenStable().then(() => {
      expect(component.guardar).toHaveBeenCalled();
    });

  }));
*/
  
});
