import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageAnswerComponent } from './chat-message-answer.component';

describe('ChatMessageAnswerComponent', () => {
  let component: ChatMessageAnswerComponent;
  let fixture: ComponentFixture<ChatMessageAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMessageAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
