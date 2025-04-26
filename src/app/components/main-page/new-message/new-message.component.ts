import { Component } from '@angular/core';
import { ChatHeaderComponent } from "../../shared/chat-header/chat-header.component";
import { ChatMessagesComponent } from "../../shared/chat-messages/chat-messages.component";
import { ChatInputComponent } from "../../shared/chat-input/chat-input.component";

@Component({
  selector: 'app-new-message',
  imports: [ChatHeaderComponent, ChatMessagesComponent, ChatInputComponent],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss'
})
export class NewMessageComponent {
  dummyThreatService = {
    messages: [],
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
  };
}
