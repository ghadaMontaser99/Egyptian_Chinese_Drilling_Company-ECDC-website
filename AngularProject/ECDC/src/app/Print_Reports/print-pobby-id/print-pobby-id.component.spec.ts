import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPOBByIdComponent } from './print-pobby-id.component';

describe('PrintPOBByIdComponent', () => {
  let component: PrintPOBByIdComponent;
  let fixture: ComponentFixture<PrintPOBByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPOBByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPOBByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
