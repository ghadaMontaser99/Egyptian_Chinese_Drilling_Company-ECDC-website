import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeCompetencyEvaluationComponent } from './edit-employee-competency-evaluation.component';

describe('EditEmployeeCompetencyEvaluationComponent', () => {
  let component: EditEmployeeCompetencyEvaluationComponent;
  let fixture: ComponentFixture<EditEmployeeCompetencyEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeCompetencyEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeCompetencyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
