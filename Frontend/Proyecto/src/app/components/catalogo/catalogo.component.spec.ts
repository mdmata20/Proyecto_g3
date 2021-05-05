import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";
import { CatalogoComponent } from './catalogo.component';
import { PagoPeliculasComponent } from '../pago-peliculas/pago-peliculas.component'
import { LoginComponent } from '../login/login.component'
import { AquilerService } from 'src/app/Servicios/aquiler.service';

describe('CatalogoComponent', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoComponent ],
      imports:[
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'pagopeliculas', component: PagoPeliculasComponent},
          { path: 'login', component: LoginComponent}
      ])
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CatalogoComponent);
      component = fixture.componentInstance;
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;

    let temporalsito = {
      id: 1,
      name: "Movie",
      availabilities: "test",
      languages: "test",
      Disponibilidad: true,
      Precio: "5",
      image: 'URL'
    }

    component.catalogo.push(temporalsito);
    component.alquileres.push(1);
    component.alquileres.push(2);
    component.alquileres.push(3);

    component = fixture.componentInstance; // BannerComponent test instance
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit()',() => {
    let catalogo = spyOn(component, 'ngOnInit').and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);
    expect(component.ngOnInit).toBeTruthy();

  });

  it("validar sessionStorage", function() {
    spyOn(window.sessionStorage, 'setItem');
    window.sessionStorage.setItem('correo', 'password');
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('correo', 'password');
  });

  it('Alquiler Button Click', fakeAsync(() => {
    spyOn(component, 'alquilarMovie');
    
    let buttonElement = fixture.debugElement.nativeElement.querySelector('.btnClass');
    
    buttonElement.click();
    
    tick();
    expect(component.alquilarMovie).toHaveBeenCalled();
  }));

  it('Desalquiler Button Click', fakeAsync(() => {
    spyOn(component, 'noAlquilarMovie');
    
    let buttonElement = fixture.debugElement.nativeElement.querySelector('.noBtnClass');
    
    buttonElement.click();
    
    tick();
    expect(component.noAlquilarMovie).toHaveBeenCalled();
  }));

  it('Alquiler Button', fakeAsync(() => {

    let evento = {
      target: {
        hidden : false,
        nextSibling: {
          hidden : true
        }
      }
    }
    
    expect(component.alquilarMovie("3", evento)).toBeUndefined();
  }));

  it('Desalquiler Button', fakeAsync(() => {
    let evento = {
      target: {
        hidden : false,
        previousSibling: {
          hidden : true
        }
      }
    }

    expect(component.noAlquilarMovie("3", evento)).toBeUndefined();
  }));

  it('almacenar los datos de DB', fakeAsync(() => {
    const service = fixture.debugElement.injector.get(AquilerService);
    
    let spy_Alqui = spyOn(service,'registrar_alquiler').and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });

    let spy_Peli = spyOn(service,'registrar_pelicula').and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });

    let spy_Vali = spyOn(service,'desabilitar_pelicula').and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.almacenarDatos();
    tick(100);
    expect(component.almacenarDatos).toBeTruthy();
  }))

});
