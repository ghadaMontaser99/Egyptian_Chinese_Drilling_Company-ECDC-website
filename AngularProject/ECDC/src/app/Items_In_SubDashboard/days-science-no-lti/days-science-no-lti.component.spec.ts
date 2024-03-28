import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysScienceNoLTIComponent } from './days-science-no-lti.component';

describe('DaysScienceNoLTIComponent', () => {
  let component: DaysScienceNoLTIComponent;
  let fixture: ComponentFixture<DaysScienceNoLTIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysScienceNoLTIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysScienceNoLTIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
