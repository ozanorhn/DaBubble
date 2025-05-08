import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { FormsModule } from '@angular/forms';
import { ThreadMessagesService } from '../../../services/threadMessages/thread-messages.service';

@Component({
  selector: 'app-chat-input',
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  @Input() chatType: 'new' | 'thread' | 'dm' | 'channel' = 'new';
  @ViewChild('messageInput') messageInputRef!: ElementRef;


  constructor(
    public messageService: MessagesService,
    public threadService: ThreadsService,
    public directMessageService: DirectMessagesService,
    public threadMessagesService: ThreadMessagesService
  ) { }


  sendMessage() {
    switch (this.chatType) {
      case 'channel':
        this.messageService.sendMessage();
        break;
      case 'thread':
        if (this.threadService.chatType === 'channel') {
          this.messageService.updateThread();
        } else {
          this.directMessageService.updateThread();
        }
        break;
      case 'dm':
        this.directMessageService.sendDirectMessage();
        break;
      case 'new':
        console.log('Funktion zum Senden einer neuen Nachricht einfügen :P');
        break;
      default:
        break;
    }
    this.messageInputRef.nativeElement.focus();
  }
}
