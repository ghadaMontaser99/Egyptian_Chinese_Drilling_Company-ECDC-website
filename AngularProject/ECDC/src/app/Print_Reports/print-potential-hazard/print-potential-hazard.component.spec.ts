import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPotentialHazardComponent } from './print-potential-hazard.component';

describe('PrintPotentialHazardComponent', () => {
  let component: PrintPotentialHazardComponent;
  let fixture: ComponentFixture<PrintPotentialHazardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPotentialHazardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPotentialHazardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
