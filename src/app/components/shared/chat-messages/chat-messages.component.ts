import { Component, inject } from '@angular/core';
import { ChatHeaderComponent } from "../chat-header/chat-header.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../services/channels/channels.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-chat-messages',
  imports: [CommonModule, ChatHeaderComponent, ChatInputComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {
 channelService = inject(ChannelsService);
 authService = inject(AuthService);
 newDay = true;

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
