import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillsCompareByRigsComponent } from './drills-compare-by-rigs.component';

describe('DrillsCompareByRigsComponent', () => {
  let component: DrillsCompareByRigsComponent;
  let fixture: ComponentFixture<DrillsCompareByRigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrillsCompareByRigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillsCompareByRigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
