import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDaysScienceNoLTIComponent } from './edit-days-science-no-lti.component';

describe('EditDaysScienceNoLTIComponent', () => {
  let component: EditDaysScienceNoLTIComponent;
  let fixture: ComponentFixture<EditDaysScienceNoLTIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDaysScienceNoLTIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDaysScienceNoLTIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
