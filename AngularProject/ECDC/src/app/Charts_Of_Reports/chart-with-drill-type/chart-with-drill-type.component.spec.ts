import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWithDrillTypeComponent } from './chart-with-drill-type.component';

describe('ChartWithDrillTypeComponent', () => {
  let component: ChartWithDrillTypeComponent;
  let fixture: ComponentFixture<ChartWithDrillTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartWithDrillTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartWithDrillTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
