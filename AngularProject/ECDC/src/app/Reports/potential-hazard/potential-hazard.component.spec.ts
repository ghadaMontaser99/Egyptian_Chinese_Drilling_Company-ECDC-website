import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialHazardComponent } from './potential-hazard.component';

describe('PotentialHazardComponent', () => {
  let component: PotentialHazardComponent;
  let fixture: ComponentFixture<PotentialHazardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialHazardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialHazardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
