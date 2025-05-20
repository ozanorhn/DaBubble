import { Component, Input, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { FormsModule } from '@angular/forms';
import { ThreadMessagesService } from '../../../services/threadMessages/thread-messages.service';
import { Message } from '../../../classes/message.class';
import { DM } from '../../../interfaces/dm';

@Component({
  selector: 'app-chat-input',
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent implements OnInit {
  @ViewChild('messageInput') messageInputRef!: ElementRef;
  @ViewChild('messageEditInput') messageEditInputRef!: ElementRef;
  @Input() chatType: 'new' | 'thread' | 'dm' | 'channel' = 'new';
  @Input() edit: boolean = false;
  @Input() message: Message | DM = new Message();
  @Input() index: number = 0;
  @Output() saveClicked = new EventEmitter<void>();

  editText: string = '';

  constructor(
    public messageService: MessagesService,
    public threadService: ThreadsService,
    public directMessageService: DirectMessagesService,
    public threadMessagesService: ThreadMessagesService
  ) { }


  ngOnInit(): void {
    this.editText = this.message.message;
  }


  sendMessage() {
    switch (this.chatType) {
      case 'channel':
        if (this.edit) {
          this.message.message = this.editText;
          this.messageService.editMessage(this.message as Message);
          this.saveClicked.emit();
        } else {
          this.messageService.sendMessage();
        }
        break;
      case 'thread':
        if (this.edit) {
          this.threadService.currentThread().content[this.index].message = this.editText
          this.threadService.updateThread(true);
          this.saveClicked.emit();
        } else if (this.threadService.chatType === 'channel') {
          this.messageService.updateThread();
        } else {
          this.directMessageService.updateThread();
        }
        break;
      case 'dm':
        if (this.edit) {
          this.directMessageService.directMessage.content[this.index].message = this.editText;
          this.directMessageService.updateDM('');
          this.saveClicked.emit();
        } else {
          this.directMessageService.sendDirectMessage();
        }
        break;
      case 'new':
        console.log('Funktion zum Senden einer neuen Nachricht einfügen :P');
        break;
      default:
        break;
    }
    this.messageInputRef.nativeElement.focus();
  }


  focusEditInput() {
  if (this.edit && this.messageEditInputRef) {
    this.messageEditInputRef.nativeElement.focus();
  }
}
}
