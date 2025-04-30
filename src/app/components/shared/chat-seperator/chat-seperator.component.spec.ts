import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSeperatorComponent } from './chat-seperator.component';

describe('ChatSeperatorComponent', () => {
  let component: ChatSeperatorComponent;
  let fixture: ComponentFixture<ChatSeperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSeperatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSeperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
