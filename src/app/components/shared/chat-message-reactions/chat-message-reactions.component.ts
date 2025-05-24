import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../../classes/message.class';
import { DM } from '../../../interfaces/dm';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-chat-message-reactions',
  imports: [],
  templateUrl: './chat-message-reactions.component.html',
  styleUrl: './chat-message-reactions.component.scss'
})
export class ChatMessageReactionsComponent {
  @Input() message: Message | DM = new Message();
  @Output() emojiPicked = new EventEmitter<string>();


  constructor(
    public usersService: UsersService
  ) { }


  public getUser(userId: string) {
    let user = this.usersService.getUserById2(userId);
    if (this.usersService.fromCurrentUser(userId)) {
      return 'Du';
    } else {
      return user?.name;
    }
  }


  react(emoji: string) {
    this.emojiPicked.emit(emoji);
  }
}