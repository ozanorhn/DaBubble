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
  // dummyThreatService = {
  //   messages: [{
  //     id: 'string',
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
  //   },
  //   {
  //     id: 'string',
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
  //   },
  //   {
  //     id: 'string',
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
  //   }],
  //   chatMessage: {
  //     id: 'string',
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
  //   }
  // };
}
