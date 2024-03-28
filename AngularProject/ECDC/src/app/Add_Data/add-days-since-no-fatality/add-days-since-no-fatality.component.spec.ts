import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDaysSinceNoFatalityComponent } from './add-days-since-no-fatality.component';

describe('AddDaysSinceNoFatalityComponent', () => {
  let component: AddDaysSinceNoFatalityComponent;
  let fixture: ComponentFixture<AddDaysSinceNoFatalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDaysSinceNoFatalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDaysSinceNoFatalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
