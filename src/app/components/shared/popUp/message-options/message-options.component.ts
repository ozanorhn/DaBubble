import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MainNavService } from '../../../../pageServices/navigates/main-nav.service';
import { ThreadsService } from '../../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../../services/directMessages/direct-messages.service';
import { Message } from '../../../../classes/message.class';
import { MessagesService } from '../../../../services/messages/messages.service';

@Component({
  standalone: true,
  selector: 'app-message-options',
  imports: [],
  templateUrl: './message-options.component.html',
  styleUrl: './message-options.component.scss'
})
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
    public messageService: MessagesService
  ) { }


  toggleEmojiReactionPicker() {
    this.emojiPickerReactions.emit()
  }


  onEditClick() {
    console.log('Edit');
    this.editClicked.emit();
  }

  // openThread(message: Message | DM, index: number) {
  openThread() {
    if (this.chatType === 'channel') {
      this.threadService.chatType = 'channel';
      this.messageService.openChannelThread(this.message as Message);
    } else if (this.chatType === 'dm') {
      this.threadService.chatType = 'dm';
      this.dmService.openDmThread(this.i);
    }
  }

  addEmoji(emoji: string) {
    this.emojiPicked.emit(emoji);
  }
}
