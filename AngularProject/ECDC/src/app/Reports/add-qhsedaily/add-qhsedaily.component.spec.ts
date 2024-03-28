import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQHSEDailyComponent } from './add-qhsedaily.component';

describe('AddQHSEDailyComponent', () => {
  let component: AddQHSEDailyComponent;
  let fixture: ComponentFixture<AddQHSEDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQHSEDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQHSEDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
