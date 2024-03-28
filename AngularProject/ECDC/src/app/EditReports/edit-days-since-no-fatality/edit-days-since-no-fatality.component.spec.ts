import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDaysSinceNoFatalityComponent } from './edit-days-since-no-fatality.component';

describe('EditDaysSinceNoFatalityComponent', () => {
  let component: EditDaysSinceNoFatalityComponent;
  let fixture: ComponentFixture<EditDaysSinceNoFatalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDaysSinceNoFatalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDaysSinceNoFatalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
