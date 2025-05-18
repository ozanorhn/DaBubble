import { Component, Input, OnInit } from '@angular/core';
import { MainNavService } from '../../../../pageServices/navigates/main-nav.service';
import { ThreadsService } from '../../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../../services/directMessages/direct-messages.service';
import { Message } from '../../../../classes/message.class';
import { MessagesService } from '../../../../services/messages/messages.service';
import { DM } from '../../../../interfaces/dm';

@Component({
  standalone: true,
  selector: 'app-message-options',
  imports: [],
  templateUrl: './message-options.component.html',
  styleUrl: './message-options.component.scss'
})
export class MessageOptionsComponent implements OnInit {
  @Input() messageFromCurrentUser = false;
  @Input() chatType: 'new' | 'channel' | 'thread' | 'dm' = 'new';
  @Input() message: Message = new Message();
  @Input() i: number = 0;


  constructor(
    public navService: MainNavService,
    public threadService: ThreadsService,
    public dmService: DirectMessagesService,
    public messageService: MessagesService
  ) { }

  ngOnInit(): void {
    console.log(this.message);
    console.log(this.i);
    console.log(this.chatType);

  }

  // openThread(message: Message | DM, index: number) {
  openThread() {
    console.log('i: ', this.i, ' message: ', ' chattype: ', this.chatType, this.message);

    if (this.chatType === 'channel') {
      this.threadService.chatType = 'channel';
      this.messageService.openChannelThread(this.message as Message);
    } else if (this.chatType === 'dm') {
      this.threadService.chatType = 'dm';
      this.dmService.openDmThread(this.i);
    }
  }

  editMessage() {
    if (this.chatType === 'channel') {
      console.log('########### ', this.chatType, '########### ', this.message.id, '########### ', this.i);
      let inputId: string = this.message.id + '_' + this.i + '_input';
      let messageContentId: string = this.message.id + '_' + this.i + '_msg';
      this.navService.toggleEditInput(inputId, messageContentId);
    } else if (this.chatType === 'thread') {
      console.log('OOOOOOOOOO', this.i, 'OOOOOOOOOO', this.threadService.currentThread().threadId);
      
    }
  }
}
