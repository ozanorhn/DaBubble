import { Component } from '@angular/core';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';

@Component({
  selector: 'app-chat-message-answer',
  imports: [],
  templateUrl: './chat-message-answer.component.html',
  styleUrl: './chat-message-answer.component.scss'
})
export class ChatMessageAnswerComponent {
  constructor(
    public mainNavService: MainNavService
  ) {}

  dummyThreatService = {
    messages: [{
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: 12,
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    }],
    chatMessage: {
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: 12,
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    }
  }
}
