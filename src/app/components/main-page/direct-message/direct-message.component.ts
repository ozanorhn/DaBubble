import { Component } from '@angular/core';
import { ChatHeaderComponent } from "../../shared/chat-header/chat-header.component";
import { ChatMessagesComponent } from "../../shared/chat-messages/chat-messages.component";
import { ChatInputComponent } from "../../shared/chat-input/chat-input.component";
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';

@Component({
  selector: 'app-direct-message',
  imports: [ChatHeaderComponent, ChatMessagesComponent, ChatInputComponent],
  templateUrl: './direct-message.component.html',
  styleUrl: './direct-message.component.scss'
})
export class DirectMessageComponent {

  constructor(
    public dmService: DirectMessagesService
  ) { }
  
}
