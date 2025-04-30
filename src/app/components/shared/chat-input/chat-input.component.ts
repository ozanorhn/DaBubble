import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { FormsModule } from '@angular/forms';

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
    public directMessageService: DirectMessagesService
  ) { }

  sendMessage() {
    switch (this.chatType) {
      case 'channel':
        this.messageService.sendMessage();
        break;
      case 'thread':
        this.threadService.sendThread();
        this.messageService.editMessage(this.threadService.currentMessageId);
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
    this.messageService.message.message = '';
    this.messageInputRef.nativeElement.focus();
  }
}
