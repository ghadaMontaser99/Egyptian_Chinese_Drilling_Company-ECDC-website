import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponsibilityComponent } from './add-responsibility.component';

describe('AddResponsibilityComponent', () => {
  let component: AddResponsibilityComponent;
  let fixture: ComponentFixture<AddResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResponsibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
