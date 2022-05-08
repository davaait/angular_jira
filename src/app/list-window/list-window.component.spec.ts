import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWindowComponent } from './list-window.component';

describe('DialogWindowComponent', () => {
  let component: ListWindowComponent;
  let fixture: ComponentFixture<ListWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
