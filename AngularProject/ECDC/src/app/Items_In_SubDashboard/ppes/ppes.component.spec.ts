import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPEsComponent } from './ppes.component';

describe('PPEsComponent', () => {
  let component: PPEsComponent;
  let fixture: ComponentFixture<PPEsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PPEsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PPEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
