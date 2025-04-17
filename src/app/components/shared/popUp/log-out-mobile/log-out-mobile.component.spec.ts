import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutMobileComponent } from './log-out-mobile.component';

describe('LogOutMobileComponent', () => {
  let component: LogOutMobileComponent;
  let fixture: ComponentFixture<LogOutMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogOutMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogOutMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
