import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../services/channels/channels.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';

@Component({
  standalone: true,
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
  ) { }
  
  newDay = true;
  @Input() chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = '';
  @Input() threadHeadMessage: any;
  @Input() messages: any[] | undefined; // oder der passende Typ
  // @Input() public messages: {
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
  // }[] = [];

  // @Input() public messages = [{
  //   id: 'string',
  //     message: 'string',
  //     sender: 'Florian Rauh',
  //     timestamp: 12,
  //     createdBy: 'string',
  //     reactions: [{
  //       id: 0,
  //       users: ['Sandra Peters'],
  //     }],
  //     threadId: 'string',
  //     channelId: 'string',
  // }];


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

  fromCurrentUser(id: string): boolean {
    if (id === this.authService.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
