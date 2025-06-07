import { Component, Input, QueryList, ViewChildren, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
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
import { User } from '../../../classes/user.class';
import { FilterService } from '../../../pageServices/filters/filter.service';
import { UserComponent } from '../user/user.component';

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
    UserComponent
  ],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})


/**
 * Displays chat messages and manages reactions, editing, and emojis.
 */

export class ChatMessagesComponent implements AfterViewInit, OnChanges {

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
  private lastMessageCount = 0;
  @ViewChild('messagesEnd') messagesEndRef!: ElementRef<HTMLDivElement>;


  constructor(
    public mainNavService: MainNavService,
    public authService: AuthService,
    public messageService: MessagesService,
    public userService: UsersService,
    public threadService: ThreadsService,
    public dmService: DirectMessagesService,
    public filterService: FilterService
  ) { }

  
  ngAfterViewInit(): void {
    this.scrollToBottomInstant();
    this.lastMessageCount = this.messages?.length || 0;
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      const currentMessageCount = this.messages?.length || 0;
      if (currentMessageCount > this.lastMessageCount) {
        this.scrollToBottomSmooth();
      }
      this.lastMessageCount = currentMessageCount;
    }
  }

  
  scrollToBottomSmooth(): void {
    setTimeout(() => {
      this.messagesEndRef?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  scrollToBottomInstant(): void {
    setTimeout(() => {
      this.messagesEndRef?.nativeElement?.scrollIntoView({ behavior: 'auto' });
    }, 0);
  }

  
  /**
   * Toggles the visibility of the emoji picker for composing new messages.
   */
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }


  /**
  * Adds or removes an emoji reaction from a message.
  * Updates the corresponding service based on the chat type.
  * @param emoji The selected emoji
  * @param message The message to react to
  * @param i The index of the message
  */
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


  /**
   * Retrieves the reactions array for a message based on the chat type.
   * @param i Index of the message
   * @returns The list of reactions for the message
   */
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


  /**
   * Determines whether to add a new reaction or modify an existing one.
   * @param reaction The current matching reaction object
   * @param emoji The emoji being added or removed
   * @param reactions The full reactions array for the message
   */
  private updateReaction(reaction: any, emoji: string, reactions: any) {
    const currentUserId = this.userService.currentUser.id;
    if (!reaction) {
      this.addReaction(emoji, reactions, currentUserId);
    } else {
      this.handleExistingReaction(reaction, reactions, currentUserId);
    }
  }


  /**
   * Adds a new emoji reaction from the current user to the message.
   * @param emoji The emoji to add
   * @param reactions The message's reactions array
   * @param currentUserId The ID of the current user
   */
  private addReaction(emoji: string, reactions: any, currentUserId: string) {
    if (reactions.length < 20) {
      reactions.push({
        emoji,
        users: [currentUserId]
      });
    }
  }


  /**
   * Handles toggling the user's reaction and removes empty reactions.
   * @param reaction The existing reaction object
   * @param reactions The message's reactions array
   * @param currentUserId The ID of the current user
   */
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


  /**
   * Toggles the edit input for a specific message.
   * Focuses the input field if it becomes active.
   * @param index The index of the message being edited
   */
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


  /**
   * Opens or closes the emoji picker for message reactions.
   * @param index The index of the message for which to toggle the picker
   */
  toggleEmojiPickerReactions(index: number): void {
    if (this.emojiIndex === index) {
      this.emojiIndex = null;
    } else {
      this.emojiIndex = index;
    }
  }
}