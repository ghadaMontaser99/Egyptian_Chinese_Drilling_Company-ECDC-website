import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRMPEByIdComponent } from './print-rmpeby-id.component';

describe('PrintRMPEByIdComponent', () => {
  let component: PrintRMPEByIdComponent;
  let fixture: ComponentFixture<PrintRMPEByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintRMPEByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintRMPEByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
