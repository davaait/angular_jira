import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignIpComponent } from './sign-ip.component';

describe('SignIpComponent', () => {
  let component: SignIpComponent;
  let fixture: ComponentFixture<SignIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignIpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
