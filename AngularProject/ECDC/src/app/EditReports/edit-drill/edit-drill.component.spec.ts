import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrillComponent } from './edit-drill.component';

describe('EditDrillComponent', () => {
  let component: EditDrillComponent;
  let fixture: ComponentFixture<EditDrillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDrillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
