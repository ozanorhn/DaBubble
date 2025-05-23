import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { ChatSeperatorComponent } from '../chat-seperator/chat-seperator.component';
import { ChatMessageReactionsComponent } from '../chat-message-reactions/chat-message-reactions.component';
import { ChatMessageAnswerComponent } from '../chat-message-answer/chat-message-answer.component';
import { UsersService } from '../../../services/users/users.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { Message } from '../../../classes/message.class';
import { MessageOptionsComponent } from '../popUp/message-options/message-options.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { EmojiPickerComponent } from '../popUp/emoji-picker/emoji-picker.component';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { User } from '../../../classes/user.class';

@Component({
  standalone: true,
  selector: 'app-chat-messages',
  imports: [
    CommonModule,
    ChatSeperatorComponent,
    ChatMessageReactionsComponent,
    ChatMessageAnswerComponent,
    MessageOptionsComponent,
    ChatInputComponent,
    EmojiPickerComponent,
  ],
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements AfterViewChecked {
  currentUser: User | null = null;
  editIndex: number | null = null;
  emojiIndex: number | null = null;
  showEmojiPicker = false;

  @Input() chatType: 'new' | 'channel' | 'thread' | 'dm' = 'new';
  @Input() threadHeadMessage: any;
  @Input() messages: Message[] = [];
  @ViewChildren(ChatInputComponent)
  chatInputComponents!: QueryList<ChatInputComponent>;
  @ViewChildren(EmojiPickerComponent)
  emojiPickerComponents!: QueryList<EmojiPickerComponent>;
  @ViewChild('scrollContainer', { static: false })
  private scrollContainer?: ElementRef<HTMLElement>;

  private lastMessageCount = 0;

  constructor(
    public mainNavService: MainNavService,
    public authService: AuthService,
    public messageService: MessagesService,
    public userService: UsersService,
    public threadService: ThreadsService,
    public dmService: DirectMessagesService,
    public localStorageService: LocalStorageService
  ) {
    this.currentUser = this.localStorageService.loadObject<User>('currentUser');
    if (this.currentUser) {
      this.userService.currentUser = this.currentUser;
    }
  }

  ngAfterViewChecked(): void {
    const count = this.messages.length;
    if (count !== this.lastMessageCount) {
      this.scrollToBottom();
      this.lastMessageCount = count;
    }
  }

  private scrollToBottom(): void {
    if (!this.scrollContainer) {
      return;
    }
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    } catch (err) {
      console.error('Scroll error', err);
    }
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    console.log(emoji);
  }


  toggleEditInput(index: number): void {
    if (this.editIndex === index) {
      this.editIndex = null;
    } else {
      this.editIndex = index;
      let id = setTimeout(() => {
        const chatInput = this.chatInputComponents.toArray()[0];
        chatInput?.focusEditInput();
        clearTimeout(id);
      }, 100);
    }
  }


  toggleEmojiPickerReactions(index: number): void {
    if (this.emojiIndex === index) {
      this.emojiIndex = null;
    } else {
      this.emojiIndex = index;
      let id = setTimeout(() => {
        const chatInput = this.emojiPickerComponents.toArray()[0];
        clearTimeout(id);
      }, 100);
    }
  }
}