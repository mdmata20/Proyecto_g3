import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTransaccionesComponent } from './mis-transacciones.component';

describe('MisTransaccionesComponent', () => {
  let component: MisTransaccionesComponent;
  let fixture: ComponentFixture<MisTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisTransaccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
