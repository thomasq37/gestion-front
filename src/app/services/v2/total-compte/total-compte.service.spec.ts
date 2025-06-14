import { TestBed } from '@angular/core/testing';

import { TotalCompteService } from './total-compte.service';

describe('TotalCompteService', () => {
  let service: TotalCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
