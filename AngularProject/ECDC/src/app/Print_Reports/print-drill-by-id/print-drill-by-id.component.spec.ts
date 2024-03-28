import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDrillByIdComponent } from './print-drill-by-id.component';

describe('PrintDrillByIdComponent', () => {
  let component: PrintDrillByIdComponent;
  let fixture: ComponentFixture<PrintDrillByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDrillByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintDrillByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
