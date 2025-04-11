import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwConfirmComponent } from './resetpw-confirm.component';

describe('ResetpwConfirmComponent', () => {
  let component: ResetpwConfirmComponent;
  let fixture: ComponentFixture<ResetpwConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpwConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetpwConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
