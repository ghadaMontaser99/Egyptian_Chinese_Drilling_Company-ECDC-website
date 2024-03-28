import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEmployeeCompetencyEvaluationtByIdComponent } from './print-employee-competency-evaluationt-by-id.component';

describe('PrintEmployeeCompetencyEvaluationtByIdComponent', () => {
  let component: PrintEmployeeCompetencyEvaluationtByIdComponent;
  let fixture: ComponentFixture<PrintEmployeeCompetencyEvaluationtByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintEmployeeCompetencyEvaluationtByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintEmployeeCompetencyEvaluationtByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
