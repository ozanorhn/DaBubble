import { Component, inject } from '@angular/core';
import { ChatHeaderComponent } from "../chat-header/chat-header.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { ChannelsService } from '../../../services/channels.service';

@Component({
  selector: 'app-chat-messages',
  imports: [ChatHeaderComponent, ChatInputComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {
 channelService = inject(ChannelsService);
}
