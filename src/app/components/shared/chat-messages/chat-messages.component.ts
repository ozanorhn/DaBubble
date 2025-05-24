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
  // currentEmoji = '';


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


  ngOnInit(): void {
    this.currentUser = this.localStorageService.loadObject<User>('currentUser');
    if (this.currentUser) {
      this.userService.currentUser = this.currentUser;
    }
  }


  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }


  async addEmoji(emoji: string, message: Message, i: number) {
    let reactions = this.getReactions(i);
    let reaction = reactions.find(r => r.emoji === emoji);
    this.updateReaction(reaction, emoji, reactions);
    switch (this.chatType) {
      case 'channel':
        await this.messageService.editMessage(message);
        break;
      case 'dm':
        await this.dmService.updateDM('');
        break;
      case 'thread':
        await this.threadService.updateThread(true);
        break;
      default:
        break;
    }
    this.emojiIndex = null;
  }


  private getReactions(i: number) {
    switch (this.chatType) {
      case 'channel':
        return this.messageService.messages()[i].reactions;
      case 'dm':
        return this.dmService.directMessage.content[i].reactions;
      case 'thread':
        return this.threadService.currentThread().content[i].reactions;
      default:
        return [];
    }
  }


  private updateReaction(reaction: any, emoji: string, reactions: any) {
    const currentUserId = this.userService.currentUser.id;
    if (!reaction) {
      this.addReaction(emoji, reactions, currentUserId);
    } else {
      this.handleExistingReaction(reaction, reactions, currentUserId);
    }
  }


  private addReaction(emoji: string, reactions: any, currentUserId: string) {
    reactions.push({
      emoji,
      users: [currentUserId]
    });
  }


  private handleExistingReaction(reaction: any, reactions: any, currentUserId: string) {
    const userIndex = reaction.users.indexOf(currentUserId);
    const reactionsIndex = reactions.indexOf(reaction);
    if (userIndex === -1) {
      reactions[reactionsIndex].users.push(currentUserId);
    } else {
      reactions[reactionsIndex].users.splice(userIndex, 1);
      if (reaction.users.length === 0) {
        reactions.splice(reactionsIndex, 1);
      }
    }
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
