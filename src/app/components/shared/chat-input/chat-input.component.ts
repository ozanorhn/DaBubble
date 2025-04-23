import { Component } from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';

@Component({
  selector: 'app-chat-input',
  imports: [],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  constructor(public messageService: MessagesService) {
    
  }

}
