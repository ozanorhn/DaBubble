import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  CUSTOM_ELEMENTS_SCHEMA,
  effect
} from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { FormsModule } from '@angular/forms';
import { ThreadMessagesService } from '../../../services/threadMessages/thread-messages.service';
import { Message } from '../../../classes/message.class';
import { DM } from '../../../interfaces/dm';
import { EmojiPickerComponent } from "../popUp/emoji-picker/emoji-picker.component";
import { FilterService } from '../../../pageServices/filters/filter.service';
import { UserComponent } from "../user/user.component";
import { User } from '../../../classes/user.class';
import { Channel } from '../../../classes/channel.class';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';

@Component({
  selector: 'app-chat-input',
  imports: [FormsModule, EmojiPickerComponent, UserComponent],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
  @ViewChild('messageInput') messageInputRef!: ElementRef;
  @ViewChild('messageEditInput') messageEditInputRef!: ElementRef;
  @Input() chatType: 'new' | 'thread' | 'dm' | 'channel' = 'new';
  @Input() edit: boolean = false;
  @Input() message: Message | DM = new Message();
  @Input() index: number = 0;
  @Output() saveClicked = new EventEmitter<void>();

  showEmojiPiucker = false;
  editText: string = '';
  showEmojiPicker = false;

  constructor(
    public messageService: MessagesService,
    public threadService: ThreadsService,
    public directMessageService: DirectMessagesService,
    public threadMessagesService: ThreadMessagesService,
    public filterService: FilterService,
    public navService: MainNavService
  ) {
    effect(() => {
      const channelClicked = this.navService.channelClicked();
      const dmClicked = this.directMessageService.dmClicked();
      if (navService.channelClicked() || directMessageService.dmClicked()) {
        navService.channelClicked.set(false);
        directMessageService.dmClicked.set(false);
        let id = setTimeout(() => {
          this.focusInput();
          clearTimeout(id);
        }, 100);
      }
    });
    let id = setTimeout(() => {
      this.focusInput();
      clearTimeout(id);
    }, 100);
  }


  focusInput() {
    this.messageInputRef.nativeElement.focus();
  }

  toggleEmojiPicker() {
    this.showEmojiPiucker = this.showEmojiPiucker === true ? false : true;
  }


  ngOnInit(): void {
    this.editText = this.message.message;
  }

  addEmoji(emoji: string) {
    if (this.edit) {
      this.editText += emoji;
    } else {
      switch (this.chatType) {
        case 'channel':
          this.messageService.messageInput += emoji;
          break;
        case 'thread':
          this.threadService.threadMessage.message += emoji;
          break;
        case 'dm':
          this.directMessageService.newMessage.message += emoji;
          break;
        default:
          break;
      }
    }
    this.toggleEmojiPicker();
  }



  // filterAsUser(item): User{

  // }

  isUser(item: any): item is User {
    return 'name' in item && 'avatar' in item; // Anpassen an Ihre User-Properties
  }

  isChannel(item: any): item is Channel {
    return 'name' in item && 'id' in item; // Anpassen an Ihre Channel-Properties
  }



  sendMessage(): void {
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
          this.threadService.currentThread().content[this.index].message = this.editText;
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
    }

    if (!this.edit) {
      this.focusInput();
    }
  }

  focusEditInput(): void {
    if (this.edit && this.messageEditInputRef) {
      this.messageEditInputRef.nativeElement.focus();
    }
  }
}
