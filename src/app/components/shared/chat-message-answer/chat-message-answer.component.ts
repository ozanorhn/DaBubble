import { Component, Input } from '@angular/core';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { Message } from '../../../classes/message.class';

@Component({
  selector: 'app-chat-message-answer',
  imports: [],
  templateUrl: './chat-message-answer.component.html',
  styleUrl: './chat-message-answer.component.scss'
})
export class ChatMessageAnswerComponent {
  constructor(
    public mainNavService: MainNavService,
    public threadServic: ThreadsService,
    public messageService: MessagesService
  ) {}

 @Input() message: Message = new Message();

 getThread() {
  return this.threadServic.loadThreadById(this.message.threadId);
 }
}
