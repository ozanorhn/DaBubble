import { Component, Input, QueryList, ViewChildren } from '@angular/core';
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
import { MessageOptionsComponent } from "../popUp/message-options/message-options.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { EmojiPickerComponent } from "../popUp/emoji-picker/emoji-picker.component";
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
    EmojiPickerComponent
  ],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {
  currentUser: User | null = null;
  lastMessageDate: Date | null = null;
  newDay = true;
  @Input() chatType: 'new' | 'channel' | 'thread' | 'dm' = 'new';
  @Input() threadHeadMessage: any;
  @Input() messages: Message[] | any[] | undefined;
  @ViewChildren(ChatInputComponent) chatInputComponents!: QueryList<ChatInputComponent>;
  @ViewChildren(EmojiPickerComponent) emojiPickerComponents!: QueryList<EmojiPickerComponent>;
  editIndex: number | null = null;
  emojiIndex: number | null = null;
  showEmojiPicker = false;

  ngOnInit(): void {
    this.currentUser = this.localStorageService.loadObject<User>('currentUser');
  
    if (this.currentUser) {
      this.userService.currentUser = this.currentUser; 
    }
  }
  
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
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    console.log('tooglePicker');
    
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
    }
  }
}
