import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCompetencyEvaluationComponent } from './employee-competency-evaluation.component';

describe('EmployeeCompetencyEvaluationComponent', () => {
  let component: EmployeeCompetencyEvaluationComponent;
  let fixture: ComponentFixture<EmployeeCompetencyEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCompetencyEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCompetencyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
