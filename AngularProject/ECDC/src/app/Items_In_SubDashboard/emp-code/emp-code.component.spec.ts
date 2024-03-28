import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCodeComponent } from './emp-code.component';

describe('EmpCodeComponent', () => {
  let component: EmpCodeComponent;
  let fixture: ComponentFixture<EmpCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
