import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQHSEDailyComponent } from './edit-qhsedaily.component';

describe('EditQHSEDailyComponent', () => {
  let component: EditQHSEDailyComponent;
  let fixture: ComponentFixture<EditQHSEDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQHSEDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQHSEDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
