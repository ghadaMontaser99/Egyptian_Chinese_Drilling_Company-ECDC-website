import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialHazardTableComponent } from './potential-hazard-table.component';

describe('PotentialHazardTableComponent', () => {
  let component: PotentialHazardTableComponent;
  let fixture: ComponentFixture<PotentialHazardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialHazardTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialHazardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
