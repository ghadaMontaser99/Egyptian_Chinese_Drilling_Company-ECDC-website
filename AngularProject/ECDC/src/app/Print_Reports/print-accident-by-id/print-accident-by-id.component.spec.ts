import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAccidentByIdComponent } from './print-accident-by-id.component';

describe('PrintAccidentByIdComponent', () => {
  let component: PrintAccidentByIdComponent;
  let fixture: ComponentFixture<PrintAccidentByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintAccidentByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintAccidentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
