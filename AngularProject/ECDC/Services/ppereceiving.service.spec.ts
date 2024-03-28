import { TestBed } from '@angular/core/testing';

import { PPEReceivingService } from './ppereceiving.service';

describe('PPEReceivingService', () => {
  let service: PPEReceivingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PPEReceivingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
