import { Component, Input } from '@angular/core';
import { Message } from '../../../classes/message.class';

@Component({
  selector: 'app-chat-message-reactions',
  imports: [],
  templateUrl: './chat-message-reactions.component.html',
  styleUrl: './chat-message-reactions.component.scss'
})
export class ChatMessageReactionsComponent {
  @Input() message: Message = new Message();
}
