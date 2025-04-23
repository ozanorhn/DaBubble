import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../services/channels/channels.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';

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
    public messageService: MessagesService) {
      setTimeout(() => {
        console.log('messages array: ', messageService.messages());

      }, 1000);
      
  }

  newDay = true;
  @Input() chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = '';
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

  @Input() public threadHeadMessage: {
    user: {
      avatar: number;
      name: string;
    };
    time: string; //number
    content: string;
    emojis: {
      id: number;
      users: string[];
    }[];
    answers?: {
      user: {
        avatar: number;
        name: string;
      };
      time: string; //number
      content: string;
      emojis: {
        id: number;
        users: string[];
      }[];
    }[];
  } | undefined;

  fromCurrentUser(id: string): boolean {
    if (id === this.authService.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
