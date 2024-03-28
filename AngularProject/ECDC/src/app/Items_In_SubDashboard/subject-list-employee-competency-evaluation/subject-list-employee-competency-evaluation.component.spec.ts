import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectListEmployeeCompetencyEvaluationComponent } from './subject-list-employee-competency-evaluation.component';

describe('SubjectListEmployeeCompetencyEvaluationComponent', () => {
  let component: SubjectListEmployeeCompetencyEvaluationComponent;
  let fixture: ComponentFixture<SubjectListEmployeeCompetencyEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectListEmployeeCompetencyEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectListEmployeeCompetencyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
