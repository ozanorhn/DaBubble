import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MainNavService } from '../../../../pageServices/navigates/main-nav.service';
import { ThreadsService } from '../../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../../services/directMessages/direct-messages.service';
import { Message } from '../../../../classes/message.class';
import { MessagesService } from '../../../../services/messages/messages.service';
import { EmojisService } from '../../../../services/emojis/emojis.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users/users.service';

@Component({
  standalone: true,
  selector: 'app-message-options',
  imports: [CommonModule],
  templateUrl: './message-options.component.html',
  styleUrl: './message-options.component.scss'
})


/**
 * Displays action options for a single message such as editing, reacting with emojis, or opening threads.
 * Emits events to the parent component to handle specific interactions.
 */
export class MessageOptionsComponent {
  @Input() messageFromCurrentUser = false;
  @Input() chatType: 'new' | 'channel' | 'thread' | 'dm' = 'new';
  @Input() message: Message = new Message();
  @Input() i: number = 0;
  @Output() editClicked = new EventEmitter<void>();
  @Output() emojiPickerReactions = new EventEmitter<void>();
  @Output() emojiPicked = new EventEmitter<string>();

  constructor(
    public navService: MainNavService,
    public threadService: ThreadsService,
    public dmService: DirectMessagesService,
    public messageService: MessagesService,
    public emojisService: EmojisService,
    public usersService: UsersService
  ) { }


  /**
   * Emits an event to toggle the emoji reaction picker UI.
   */
  toggleEmojiReactionPicker() {
    this.emojiPickerReactions.emit()
  }


  /**
   * Emits an event when the edit action is triggered.
   */
  onEditClick() {
    this.editClicked.emit();
  }


  /**
   * Opens a thread view for the current message, depending on chat type.
   */
  openThread() {
    if (this.chatType === 'channel') {
      this.threadService.chatType = 'channel';
      this.messageService.openChannelThread(this.message as Message);
    } else if (this.chatType === 'dm') {
      this.threadService.chatType = 'dm';
      this.dmService.openOrCreateMessageThread(this.i);
    }
  }


  /**
   * Emits the selected emoji to be added as a reaction.
   * @param emoji The emoji string selected by the user.
   */
  addEmoji(emoji: string) {
    this.emojiPicked.emit(emoji);
  }
}