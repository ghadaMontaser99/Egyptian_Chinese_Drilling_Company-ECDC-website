import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDrillComponent } from './print-drill.component';

describe('PrintDrillComponent', () => {
  let component: PrintDrillComponent;
  let fixture: ComponentFixture<PrintDrillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDrillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
