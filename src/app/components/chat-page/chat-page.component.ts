import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ChatMessagesComponent } from "../shared/chat-messages/chat-messages.component";

@Component({
  selector: 'app-chat-page',
  imports: [HeaderComponent, ChatMessagesComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  thread = false;
}
