import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QHSEDailyComponent } from './qhsedaily.component';

describe('QHSEDailyComponent', () => {
  let component: QHSEDailyComponent;
  let fixture: ComponentFixture<QHSEDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QHSEDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QHSEDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
