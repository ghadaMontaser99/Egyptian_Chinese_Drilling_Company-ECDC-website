import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderShipVisitComponent } from './leader-ship-visit.component';

describe('LeaderShipVisitComponent', () => {
  let component: LeaderShipVisitComponent;
  let fixture: ComponentFixture<LeaderShipVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderShipVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderShipVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
