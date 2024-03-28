import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEmployeeCompetencyEvaluationComponent } from './print-employee-competency-evaluation.component';

describe('PrintEmployeeCompetencyEvaluationComponent', () => {
  let component: PrintEmployeeCompetencyEvaluationComponent;
  let fixture: ComponentFixture<PrintEmployeeCompetencyEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintEmployeeCompetencyEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintEmployeeCompetencyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
