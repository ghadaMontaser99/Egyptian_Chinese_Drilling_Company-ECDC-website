import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrillTypesComponent } from './edit-drill-types.component';

describe('EditDrillTypesComponent', () => {
  let component: EditDrillTypesComponent;
  let fixture: ComponentFixture<EditDrillTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDrillTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDrillTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
