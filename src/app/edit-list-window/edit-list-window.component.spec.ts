import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListWindowComponent } from './edit-list-window.component';

describe('DialogWindowComponent', () => {
  let component: EditListWindowComponent;
  let fixture: ComponentFixture<EditListWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
