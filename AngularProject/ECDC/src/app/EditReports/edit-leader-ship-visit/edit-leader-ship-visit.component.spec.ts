import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaderShipVisitComponent } from './edit-leader-ship-visit.component';

describe('EditLeaderShipVisitComponent', () => {
  let component: EditLeaderShipVisitComponent;
  let fixture: ComponentFixture<EditLeaderShipVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLeaderShipVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLeaderShipVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
