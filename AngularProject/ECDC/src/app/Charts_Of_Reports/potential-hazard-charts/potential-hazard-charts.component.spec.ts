import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialHazardChartsComponent } from './potential-hazard-charts.component';

describe('PotentialHazardChartsComponent', () => {
  let component: PotentialHazardChartsComponent;
  let fixture: ComponentFixture<PotentialHazardChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialHazardChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialHazardChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
