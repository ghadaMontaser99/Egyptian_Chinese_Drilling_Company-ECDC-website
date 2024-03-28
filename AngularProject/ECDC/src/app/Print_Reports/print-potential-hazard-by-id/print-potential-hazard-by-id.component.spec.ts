import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPotentialHazardByIdComponent } from './print-potential-hazard-by-id.component';

describe('PrintPotentialHazardByIdComponent', () => {
  let component: PrintPotentialHazardByIdComponent;
  let fixture: ComponentFixture<PrintPotentialHazardByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPotentialHazardByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPotentialHazardByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
