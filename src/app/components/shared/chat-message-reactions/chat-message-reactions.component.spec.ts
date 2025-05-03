import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageReactionsComponent } from './chat-message-reactions.component';

describe('ChatMessageReactionsComponent', () => {
  let component: ChatMessageReactionsComponent;
  let fixture: ComponentFixture<ChatMessageReactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageReactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMessageReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
