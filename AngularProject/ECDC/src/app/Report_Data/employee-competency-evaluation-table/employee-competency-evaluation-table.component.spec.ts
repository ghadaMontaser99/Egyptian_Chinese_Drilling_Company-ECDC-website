import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCompetencyEvaluationTableComponent } from './employee-competency-evaluation-table.component';

describe('EmployeeCompetencyEvaluationTableComponent', () => {
  let component: EmployeeCompetencyEvaluationTableComponent;
  let fixture: ComponentFixture<EmployeeCompetencyEvaluationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCompetencyEvaluationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCompetencyEvaluationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
