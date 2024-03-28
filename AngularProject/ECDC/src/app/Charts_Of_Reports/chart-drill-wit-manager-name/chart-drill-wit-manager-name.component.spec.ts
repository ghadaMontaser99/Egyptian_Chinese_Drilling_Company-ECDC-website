import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDrillWitManagerNameComponent } from './chart-drill-wit-manager-name.component';

describe('ChartDrillWitManagerNameComponent', () => {
  let component: ChartDrillWitManagerNameComponent;
  let fixture: ComponentFixture<ChartDrillWitManagerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDrillWitManagerNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDrillWitManagerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
