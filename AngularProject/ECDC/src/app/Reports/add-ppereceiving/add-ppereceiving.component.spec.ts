import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPPEReceivingComponent } from './add-ppereceiving.component';

describe('AddPPEReceivingComponent', () => {
  let component: AddPPEReceivingComponent;
  let fixture: ComponentFixture<AddPPEReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPPEReceivingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPPEReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
