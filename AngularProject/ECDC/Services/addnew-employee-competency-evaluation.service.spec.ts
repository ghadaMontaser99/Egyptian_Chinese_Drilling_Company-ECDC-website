import { TestBed } from '@angular/core/testing';

import { AddnewEmployeeCompetencyEvaluationService } from './addnew-employee-competency-evaluation.service';

describe('AddnewEmployeeCompetencyEvaluationService', () => {
  let service: AddnewEmployeeCompetencyEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddnewEmployeeCompetencyEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
