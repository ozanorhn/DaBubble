import { Component } from '@angular/core';
import { ChatHeaderComponent } from '../../shared/chat-header/chat-header.component';
import { ChatMessagesComponent } from '../../shared/chat-messages/chat-messages.component';
import { ChatInputComponent } from '../../shared/chat-input/chat-input.component';
import { ThreadsService } from '../../../services/threads/threads.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { Message } from '../../../classes/message.class';
import { CommonModule } from '@angular/common';
import { ThreadMessagesService } from '../../../services/threadMessages/thread-messages.service';
import { UsersService } from '../../../services/users/users.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-thread',
  imports: [CommonModule, ChatHeaderComponent, ChatMessagesComponent, ChatInputComponent],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent {
  constructor(
    public threadService: ThreadsService,
    public threadMessagesService: ThreadMessagesService,
    public messagesService: MessagesService,
    public userService: UsersService,
    public dmService: DirectMessagesService
  ) { }

  fromCurrentUser(dummy: any) { // in den UserService auslagern
    dummy = false;
    return dummy;
  }

  getUserFromService() {
    if (this.threadService.chatType === 'channel') {
      return {
        sender: this.threadMessagesService.currentMessage.sender,
        timestamp: this.threadMessagesService.currentMessage.timestamp,
        message: this.threadMessagesService.currentMessage.message
      };
    } else {
      return {
        sender: this.dmService.directMessage.content[this.dmService.currentDMIndex].sender,
        timestamp:  this.dmService.directMessage.content[this.dmService.currentDMIndex].timestamp,
        message:  this.dmService.directMessage.content[this.dmService.currentDMIndex].message
      };
    }
  }


  //   dummmyAuthService = {
  //     users: [{ id: 0, name: 'Peter Beck' }]
  //   }

  //   dummyThreatService = {
  //     messages: [{
  //       id: 'string',
  //       message: 'string',
  //       sender: 'Florian Rauh',
  //       timestamp: 12,
  //       createdBy: 'string',
  //       reactions: [{
  //         id: 0,
  //         users: ['Sandra Peters'],
  //       }],
  //       threadId: 'string',
  //       channelId: 'string',
  //     },
  //     {
  //       id: 'string',
  //       message: 'string',
  //       sender: 'Florian Rauh',
  //       timestamp: 12,
  //       createdBy: 'string',
  //       reactions: [{
  //         id: 0,
  //         users: ['Sandra Peters'],
  //       }],
  //       threadId: 'string',
  //       channelId: 'string',
  //     },
  //     {
  //       id: 'string',
  //       message: 'string',
  //       sender: 'Florian Rauh',
  //       timestamp: 12,
  //       createdBy: 'string',
  //       reactions: [{
  //         id: 0,
  //         users: ['Sandra Peters'],
  //       }],
  //       threadId: 'string',
  //       channelId: 'string',
  //     }],
  //     chatMessage: {
  //       id: 'string',
  //       message: 'string',
  //       sender: 'Florian Rauh',
  //       timestamp: 12,
  //       createdBy: 'string',
  //       reactions: [{
  //         id: 0,
  //         users: ['Sandra Peters'],
  //       }],
  //       threadId: 'string',
  //       channelId: 'string',
  //     }
  //   };
}
