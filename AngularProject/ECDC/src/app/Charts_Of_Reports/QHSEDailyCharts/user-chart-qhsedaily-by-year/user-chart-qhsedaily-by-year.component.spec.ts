import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChartQHSEDailyByYearComponent } from './user-chart-qhsedaily-by-year.component';

describe('UserChartQHSEDailyByYearComponent', () => {
  let component: UserChartQHSEDailyByYearComponent;
  let fixture: ComponentFixture<UserChartQHSEDailyByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChartQHSEDailyByYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChartQHSEDailyByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
