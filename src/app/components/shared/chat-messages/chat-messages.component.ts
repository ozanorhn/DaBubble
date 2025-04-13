import { Component, inject } from '@angular/core';
import { ChatHeaderComponent } from "../chat-header/chat-header.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { ChannelsService } from '../../../services/channels.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-messages',
  imports: [CommonModule, ChatHeaderComponent, ChatInputComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {
 channelService = inject(ChannelsService);
 authService = inject(AuthService);

 openThread() {
  this.channelService.chatType = 'thread';
 }

 fromCurrentUser(id: string): boolean {
  if (id === this.authService.currentUser) {
    return true;
  } else {
    return false;
  }
 }
}
