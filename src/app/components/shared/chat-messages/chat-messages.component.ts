import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../services/channels/channels.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { Message } from '../../../classes/message.class';

@Component({
  selector: 'app-chat-messages',
  imports: [CommonModule],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {

  constructor(    
    public mainNavService: MainNavService,
    public channelService: ChannelsService,
    public authService: AuthService,
    public messageService: MessagesService
  ) {

  }
  
  newDay = true;
  @Input() chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = '';
  @Input() public messages = [{
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
  }];

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

  // @Input() public threadHeadMessage: {
  //   user: {
  //     avatar: number;
  //     name: string;
  //   };
  //   time: string; //number
  //   content: string;
  //   emojis: {
  //     id: number;
  //     users: string[];
  //   }[];
  //   answers?: {
  //     user: {
  //       avatar: number;
  //       name: string;
  //     };
  //     time: string; //number
  //     content: string;
  //     emojis: {
  //       id: number;
  //       users: string[];
  //     }[];
  //   }[];
  // } | undefined;

  fromCurrentUser(id: string): boolean {
    if (id === this.authService.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
