import { Component } from '@angular/core';
import { ChatHeaderComponent } from '../../shared/chat-header/chat-header.component';
import { ChatMessagesComponent } from '../../shared/chat-messages/chat-messages.component';
import { ChatInputComponent } from '../../shared/chat-input/chat-input.component';
import { ThreadsService } from '../../../services/threads/threads.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { Message } from '../../../classes/message.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thread',
  imports: [CommonModule, ChatHeaderComponent, ChatMessagesComponent, ChatInputComponent],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent {
  constructor(
    public threadService: ThreadsService
  ) { }

  fromCurrentUser(dummy: any) {
    dummy = false;
    return dummy;
  }

  dummmyAuthService = {
    users: [{ id: 0, name: 'Peter Beck' }]
  }

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
    },
    {
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
    },
    {
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
