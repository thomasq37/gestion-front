import { TestBed } from '@angular/core/testing';

import { MistralaiService } from './mistralai.service';

describe('MistralaiService', () => {
  let service: MistralaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MistralaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
