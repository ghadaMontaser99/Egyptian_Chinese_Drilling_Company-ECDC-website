import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectListComponent } from './add-subject-list.component';

describe('AddSubjectListComponent', () => {
  let component: AddSubjectListComponent;
  let fixture: ComponentFixture<AddSubjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubjectListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
