import { TestBed } from '@angular/core/testing';

import { AquilerService } from './aquiler.service';

describe('AquilerService', () => {
  let service: AquilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AquilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
