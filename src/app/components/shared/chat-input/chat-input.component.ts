import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { FormsModule } from '@angular/forms';
import { EmojiPickerComponent } from "../../main-page/emoji-picker/emoji-picker.component";

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule, EmojiPickerComponent],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'] // korrigiert
})
export class ChatInputComponent {
  @Input() chatType: 'new' | 'thread' | 'dm' | 'channel' = 'new';
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;

  showPicker = false;

  constructor(
    public messageService: MessagesService,
    public threadService: ThreadsService,
    public directMessageService: DirectMessagesService
  ) { }

  togglePicker() {
    this.showPicker = !this.showPicker;
  }

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
    this.messageInput.nativeElement.focus();
  }

  onEmojiPicked(emoji: string) {
    const input = this.messageInput.nativeElement;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const text = input.value;
    input.value = text.slice(0, start) + emoji + text.slice(end);
    input.selectionStart = input.selectionEnd = start + emoji.length;
    input.focus();

    // Auch im MessageService aktualisieren:
    this.messageService.message.message = input.value;
  }
}
