import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskWindowComponent } from './edit-task-window.component';

describe('DialogWindowComponent', () => {
  let component: EditTaskWindowComponent;
  let fixture: ComponentFixture<EditTaskWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
