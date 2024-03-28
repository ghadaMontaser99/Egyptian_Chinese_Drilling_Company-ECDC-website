import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSJPByIdComponent } from './print-sjpby-id.component';

describe('PrintSJPByIdComponent', () => {
  let component: PrintSJPByIdComponent;
  let fixture: ComponentFixture<PrintSJPByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSJPByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintSJPByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
