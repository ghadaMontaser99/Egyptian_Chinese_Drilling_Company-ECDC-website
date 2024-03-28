import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPPEReceivingComponent } from './print-ppereceiving.component';

describe('PrintPPEReceivingComponent', () => {
  let component: PrintPPEReceivingComponent;
  let fixture: ComponentFixture<PrintPPEReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPPEReceivingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPPEReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
