import { Component } from '@angular/core';
import { ChatHeaderComponent } from "../../shared/chat-header/chat-header.component";
import { ChatMessagesComponent } from "../../shared/chat-messages/chat-messages.component";
import { ChatInputComponent } from "../../shared/chat-input/chat-input.component";
import { MessagesService } from '../../../services/messages/messages.service';

@Component({
  selector: 'app-channel',
  imports: [ChatHeaderComponent, ChatMessagesComponent, ChatInputComponent],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent {

  dummyThreatService = {
    messages: [{
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: '24. April 2025 um 22:44:45 UTC+2',
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    },
    {
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: '26. April 2025 um 22:44:45 UTC+2',
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    },
    {
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: '26. April 2025 um 22:44:45 UTC+2',
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
      timestamp: '26. April 2025 um 22:44:45 UTC+2',
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    }
  };

  constructor(
   public messageService: MessagesService
  ) {}

}
