import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysSinceNoFatalityComponent } from './days-since-no-fatality.component';

describe('DaysSinceNoFatalityComponent', () => {
  let component: DaysSinceNoFatalityComponent;
  let fixture: ComponentFixture<DaysSinceNoFatalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysSinceNoFatalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysSinceNoFatalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
