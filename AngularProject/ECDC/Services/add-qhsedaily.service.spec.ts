import { TestBed } from '@angular/core/testing';

import { AddQHSEDailyService } from './add-qhsedaily.service';

describe('AddQHSEDailyService', () => {
  let service: AddQHSEDailyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddQHSEDailyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
