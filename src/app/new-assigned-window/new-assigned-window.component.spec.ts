import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssignedWindowComponent } from './new-assigned-window.component';

describe('DialogWindowComponent', () => {
  let component: NewAssignedWindowComponent;
  let fixture: ComponentFixture<NewAssignedWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAssignedWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssignedWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
