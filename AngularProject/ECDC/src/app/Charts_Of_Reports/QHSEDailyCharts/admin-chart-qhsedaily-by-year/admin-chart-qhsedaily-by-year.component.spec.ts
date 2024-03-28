import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartQHSEDailyByYearComponent } from './admin-chart-qhsedaily-by-year.component';

describe('AdminChartQHSEDailyByYearComponent', () => {
  let component: AdminChartQHSEDailyByYearComponent;
  let fixture: ComponentFixture<AdminChartQHSEDailyByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChartQHSEDailyByYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChartQHSEDailyByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
