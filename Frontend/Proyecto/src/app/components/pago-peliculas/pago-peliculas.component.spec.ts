import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPeliculasComponent } from './pago-peliculas.component';

describe('PagoPeliculasComponent', () => {
  let component: PagoPeliculasComponent;
  let fixture: ComponentFixture<PagoPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoPeliculasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
