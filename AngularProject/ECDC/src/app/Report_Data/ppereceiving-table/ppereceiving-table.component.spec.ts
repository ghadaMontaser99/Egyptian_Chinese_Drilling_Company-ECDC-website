import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPEReceivingTableComponent } from './ppereceiving-table.component';

describe('PPEReceivingTableComponent', () => {
  let component: PPEReceivingTableComponent;
  let fixture: ComponentFixture<PPEReceivingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PPEReceivingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PPEReceivingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
