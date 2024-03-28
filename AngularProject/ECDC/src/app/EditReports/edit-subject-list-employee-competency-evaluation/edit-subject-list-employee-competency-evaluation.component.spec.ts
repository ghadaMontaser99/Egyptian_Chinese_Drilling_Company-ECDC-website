import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjectListEmployeeCompetencyEvaluationComponent } from './edit-subject-list-employee-competency-evaluation.component';

describe('EditSubjectListEmployeeCompetencyEvaluationComponent', () => {
  let component: EditSubjectListEmployeeCompetencyEvaluationComponent;
  let fixture: ComponentFixture<EditSubjectListEmployeeCompetencyEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubjectListEmployeeCompetencyEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubjectListEmployeeCompetencyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
