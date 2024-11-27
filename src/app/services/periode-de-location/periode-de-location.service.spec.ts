import { TestBed } from '@angular/core/testing';

import { PeriodeDeLocationService } from './periode-de-location.service';

describe('PeriodeDeLocationService', () => {
  let service: PeriodeDeLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodeDeLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
