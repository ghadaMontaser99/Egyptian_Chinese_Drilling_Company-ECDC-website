import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPPEReceivingComponent } from './edit-ppereceiving.component';

describe('EditPPEReceivingComponent', () => {
  let component: EditPPEReceivingComponent;
  let fixture: ComponentFixture<EditPPEReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPPEReceivingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPPEReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
