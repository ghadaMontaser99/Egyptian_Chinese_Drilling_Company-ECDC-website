import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintQHSEDailyComponent } from './print-qhsedaily.component';

describe('PrintQHSEDailyComponent', () => {
  let component: PrintQHSEDailyComponent;
  let fixture: ComponentFixture<PrintQHSEDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintQHSEDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintQHSEDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
