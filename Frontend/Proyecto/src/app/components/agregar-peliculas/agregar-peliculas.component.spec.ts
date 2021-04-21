import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPeliculasComponent } from './agregar-peliculas.component';

describe('AgregarPeliculasComponent', () => {
  let component: AgregarPeliculasComponent;
  let fixture: ComponentFixture<AgregarPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPeliculasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
