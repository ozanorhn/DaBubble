import { Component, Input } from '@angular/core';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { Message } from '../../../classes/message.class';
import { ThreadDMsService } from '../../../services/threadDMs/thread-dms.service';
import { ThreadMessagesService } from '../../../services/threadMessages/thread-messages.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';

@Component({
  selector: 'app-chat-message-answer',
  imports: [],
  templateUrl: './chat-message-answer.component.html',
  styleUrl: './chat-message-answer.component.scss'
})
export class ChatMessageAnswerComponent {
 @Input() message: Message = new Message();
 @Input() chatType: 'new' | 'channel' | 'thread' | 'dm' = 'new';
 @Input() i: number = 0;

 
 constructor(
  public mainNavService: MainNavService,
  public threadService: ThreadsService,
  public threadDmsService: ThreadDMsService,
  public threadMessagesService: ThreadMessagesService,
  public messageService: MessagesService,
  public dmService: DirectMessagesService
) {}


openThread() {
    if (this.chatType === 'channel') {
    this.threadService.chatType = 'channel';
      this.messageService.openChannelThread(this.message as Message);
    } else if (this.chatType === 'dm') {
    this.threadService.chatType = 'dm';
      this.dmService.openOrCreateMessageThread(this.i);
    }
  }
}
