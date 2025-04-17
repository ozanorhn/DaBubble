import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../services/channels/channels.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ChannelPageNavService } from '../../../pageNavServices/channel-page-nav.service';

@Component({
  selector: 'app-chat-messages',
  imports: [CommonModule],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {
 channelService = inject(ChannelsService);
 authService = inject(AuthService);
 channelNavService = inject(ChannelPageNavService);
 newDay = true;
 @Input()chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = '';
 @Input() public messages: {
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
}[] = [];

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

//  openThread() {
//   this.channelService.chatType = 'thread';
//  }

 fromCurrentUser(id: string): boolean {
  if (id === this.authService.currentUser) {
    return true;
  } else {
    return false;
  }
 }
}
