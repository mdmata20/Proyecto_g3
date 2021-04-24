import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioPeliculaComponent } from './inventario-pelicula.component';

describe('InventarioPeliculaComponent', () => {
  let component: InventarioPeliculaComponent;
  let fixture: ComponentFixture<InventarioPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioPeliculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
