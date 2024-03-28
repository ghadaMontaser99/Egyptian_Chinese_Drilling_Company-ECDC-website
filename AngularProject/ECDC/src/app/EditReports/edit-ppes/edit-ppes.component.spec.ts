import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPPEsComponent } from './edit-ppes.component';

describe('EditPPEsComponent', () => {
  let component: EditPPEsComponent;
  let fixture: ComponentFixture<EditPPEsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPPEsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPPEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
