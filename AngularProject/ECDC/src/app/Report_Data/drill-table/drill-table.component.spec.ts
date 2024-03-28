import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillTableComponent } from './drill-table.component';

describe('DrillTableComponent', () => {
  let component: DrillTableComponent;
  let fixture: ComponentFixture<DrillTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrillTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
