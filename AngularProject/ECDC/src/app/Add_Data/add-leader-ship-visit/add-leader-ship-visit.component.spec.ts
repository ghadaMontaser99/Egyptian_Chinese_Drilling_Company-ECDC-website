import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaderShipVisitComponent } from './add-leader-ship-visit.component';

describe('AddLeaderShipVisitComponent', () => {
  let component: AddLeaderShipVisitComponent;
  let fixture: ComponentFixture<AddLeaderShipVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaderShipVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaderShipVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
