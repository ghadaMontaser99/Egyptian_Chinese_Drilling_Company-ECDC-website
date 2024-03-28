import { TestBed } from '@angular/core/testing';

import { AddNewDrillServiceService } from './add-new-drill-service.service';

describe('AddNewDrillServiceService', () => {
  let service: AddNewDrillServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewDrillServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
