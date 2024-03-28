import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPPEsComponent } from './add-ppes.component';

describe('AddPPEsComponent', () => {
  let component: AddPPEsComponent;
  let fixture: ComponentFixture<AddPPEsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPPEsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPPEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
