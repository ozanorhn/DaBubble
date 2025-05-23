import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLeaveChannelComponent } from './confirm-leave-channel.component';

describe('ConfirmLeaveChannelComponent', () => {
  let component: ConfirmLeaveChannelComponent;
  let fixture: ComponentFixture<ConfirmLeaveChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmLeaveChannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmLeaveChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
