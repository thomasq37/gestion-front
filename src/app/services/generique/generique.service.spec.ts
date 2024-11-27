import { TestBed } from '@angular/core/testing';

import { GeneriqueService } from './generique.service';

describe('GeneriqueService', () => {
  let service: GeneriqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneriqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
