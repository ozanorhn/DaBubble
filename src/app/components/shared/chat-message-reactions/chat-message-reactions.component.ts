import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../../classes/message.class';
import { DM } from '../../../interfaces/dm';
import { UsersService } from '../../../services/users/users.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';

@Component({
  selector: 'app-chat-message-reactions',
  imports: [],
  templateUrl: './chat-message-reactions.component.html',
  styleUrl: './chat-message-reactions.component.scss'
})
export class ChatMessageReactionsComponent {
  @Input() message: Message | DM = new Message();
  @Input() chatType: 'dm' | 'thread' | 'channel' | 'new' = 'new';
  @Output() emojiPicked = new EventEmitter<string>();
  @Output() pickerToggled = new EventEmitter<void>();
  // maxShown = 7;
  readonly maxShown = computed(() => {
  return this.chatType === 'thread'
    ? this.navService.amountThreadReactions()
    : this.navService.amountChannelReactions();
});


  constructor(
    public usersService: UsersService,
    public navService: MainNavService
  ) {
    // this.setMaxShown();
  }


  // setMaxShown() {
  //   if (this.navService.bigScreen()) {
  //     this.maxShown = 20;
  //   }
  // }


  public getUser(userId: string) {
    let user = this.usersService.getUserById2(userId);
    if (this.usersService.fromCurrentUser(userId)) {
      return 'Du';
    } else {
      return user?.name;
    }
  }


  public react(emoji: string) {
    this.emojiPicked.emit(emoji);
  }


  public toggleEmojiPicker() {
    this.pickerToggled.emit();
  }
}