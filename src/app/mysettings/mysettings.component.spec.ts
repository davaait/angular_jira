import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysettingsComponent } from './mysettings.component';

describe('MysettingsComponent', () => {
  let component: MysettingsComponent;
  let fixture: ComponentFixture<MysettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
