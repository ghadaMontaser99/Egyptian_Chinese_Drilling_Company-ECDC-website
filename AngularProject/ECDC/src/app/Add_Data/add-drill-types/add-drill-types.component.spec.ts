import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrillTypesComponent } from './add-drill-types.component';

describe('AddDrillTypesComponent', () => {
  let component: AddDrillTypesComponent;
  let fixture: ComponentFixture<AddDrillTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrillTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDrillTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
