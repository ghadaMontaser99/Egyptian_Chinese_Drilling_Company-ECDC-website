import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillTypesComponent } from './drill-types.component';

describe('DrillTypesComponent', () => {
  let component: DrillTypesComponent;
  let fixture: ComponentFixture<DrillTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrillTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
