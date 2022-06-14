import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameBoardWindowComponent } from './rename-board-window.component';

describe('DialogWindowComponent', () => {
  let component: RenameBoardWindowComponent;
  let fixture: ComponentFixture<RenameBoardWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameBoardWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameBoardWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
