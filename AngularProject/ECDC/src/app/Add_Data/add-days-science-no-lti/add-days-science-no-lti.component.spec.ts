import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDaysScienceNoLTIComponent } from './add-days-science-no-lti.component';

describe('AddDaysScienceNoLTIComponent', () => {
  let component: AddDaysScienceNoLTIComponent;
  let fixture: ComponentFixture<AddDaysScienceNoLTIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDaysScienceNoLTIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDaysScienceNoLTIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
