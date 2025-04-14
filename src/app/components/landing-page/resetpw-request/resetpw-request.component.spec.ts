import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwRequestComponent } from './resetpw-request.component';

describe('ResetpwRequestComponent', () => {
  let component: ResetpwRequestComponent;
  let fixture: ComponentFixture<ResetpwRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpwRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetpwRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
