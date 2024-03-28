import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartQHSEDailyByMonthComponent } from './admin-chart-qhsedaily-by-month.component';

describe('AdminChartQHSEDailyByMonthComponent', () => {
  let component: AdminChartQHSEDailyByMonthComponent;
  let fixture: ComponentFixture<AdminChartQHSEDailyByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChartQHSEDailyByMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChartQHSEDailyByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
