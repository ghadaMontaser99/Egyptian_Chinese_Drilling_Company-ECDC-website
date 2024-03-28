import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrewComponent } from './edit-crew.component';

describe('EditCrewComponent', () => {
  let component: EditCrewComponent;
  let fixture: ComponentFixture<EditCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCrewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
