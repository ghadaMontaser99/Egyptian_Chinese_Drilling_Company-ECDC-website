import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPPEReceivingByIdComponent } from './print-ppereceiving-by-id.component';

describe('PrintPPEReceivingByIdComponent', () => {
  let component: PrintPPEReceivingByIdComponent;
  let fixture: ComponentFixture<PrintPPEReceivingByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPPEReceivingByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPPEReceivingByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
