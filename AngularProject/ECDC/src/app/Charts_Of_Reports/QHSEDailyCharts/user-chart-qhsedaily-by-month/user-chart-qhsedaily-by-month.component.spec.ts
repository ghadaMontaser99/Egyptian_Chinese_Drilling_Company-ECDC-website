import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChartQHSEDailyByMonthComponent } from './user-chart-qhsedaily-by-month.component';

describe('UserChartQHSEDailyByMonthComponent', () => {
  let component: UserChartQHSEDailyByMonthComponent;
  let fixture: ComponentFixture<UserChartQHSEDailyByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChartQHSEDailyByMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChartQHSEDailyByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
