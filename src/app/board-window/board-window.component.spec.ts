import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardWindowComponent } from './board-window.component';

describe('DialogWindowComponent', () => {
  let component: BoardWindowComponent;
  let fixture: ComponentFixture<BoardWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
