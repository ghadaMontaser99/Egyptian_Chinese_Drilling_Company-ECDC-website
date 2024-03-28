import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintStopCardByIdComponent } from './print-stop-card-by-id.component';

describe('PrintStopCardByIdComponent', () => {
  let component: PrintStopCardByIdComponent;
  let fixture: ComponentFixture<PrintStopCardByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintStopCardByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintStopCardByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
