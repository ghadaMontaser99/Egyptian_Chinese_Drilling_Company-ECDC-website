import { TestBed } from '@angular/core/testing';

import { PotentialHazardService } from './potential-hazard.service';

describe('PotentialHazardService', () => {
  let service: PotentialHazardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotentialHazardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
