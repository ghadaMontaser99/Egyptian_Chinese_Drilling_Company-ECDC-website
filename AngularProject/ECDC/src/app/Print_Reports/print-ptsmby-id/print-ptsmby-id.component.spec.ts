import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPTSMByIdComponent } from './print-ptsmby-id.component';

describe('PrintPTSMByIdComponent', () => {
  let component: PrintPTSMByIdComponent;
  let fixture: ComponentFixture<PrintPTSMByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPTSMByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPTSMByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
