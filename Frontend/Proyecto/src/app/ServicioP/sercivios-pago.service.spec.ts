import { TestBed } from '@angular/core/testing';

import { SerciviosPagoService } from './sercivios-pago.service';

describe('SerciviosPagoService', () => {
  let service: SerciviosPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerciviosPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
