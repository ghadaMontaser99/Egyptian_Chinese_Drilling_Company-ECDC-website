import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPotentialHazardComponent } from './edit-potential-hazard.component';

describe('EditPotentialHazardComponent', () => {
  let component: EditPotentialHazardComponent;
  let fixture: ComponentFixture<EditPotentialHazardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPotentialHazardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPotentialHazardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
