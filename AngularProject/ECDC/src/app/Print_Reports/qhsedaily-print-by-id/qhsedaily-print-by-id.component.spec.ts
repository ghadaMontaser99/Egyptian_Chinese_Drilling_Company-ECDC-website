import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QHSEDailyPrintByIdComponent } from './qhsedaily-print-by-id.component';

describe('QHSEDailyPrintByIdComponent', () => {
  let component: QHSEDailyPrintByIdComponent;
  let fixture: ComponentFixture<QHSEDailyPrintByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QHSEDailyPrintByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QHSEDailyPrintByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
