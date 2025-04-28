import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../services/channels/channels.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { ChatSeperatorComponent } from '../chat-seperator/chat-seperator.component';
import { ChatMessageReactionsComponent } from '../chat-message-reactions/chat-message-reactions.component';
import { ChatMessageAnswerComponent } from '../chat-message-answer/chat-message-answer.component';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { UsersService } from '../../../services/users/users.service';
registerLocaleData(localeDe);

@Component({
  standalone: true,
  selector: 'app-chat-messages',
  imports: [CommonModule, ChatSeperatorComponent, ChatMessageReactionsComponent, ChatMessageAnswerComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {

  lastMessageDate: Date | null = null;

  constructor(
    public mainNavService: MainNavService,
    // public channelService: ChannelsService,
    public authService: AuthService,
    public messageService: MessagesService,
    public userService: UsersService
  ) { }

   test() {
    // console.log('TEST GET USER BY ID ', this.messageService.getUserById('PG6Ir3hx8xlEENP26Uhi'));
    console.log('Users ', this.userService.users);
   }
  
  newDay = true;
  @Input() chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = '';
  @Input() threadHeadMessage: any;
  @Input() messages: any[] | undefined; // oder der passende Typ

  // getDateLabel(dateString: string): string {
  //   // console.log('DATESTRING: ', dateString);
  //   if (dateString !== undefined) {
  //     dateString = dateString.replace(' um ', ' ');
  //     let date = new Date(dateString);
  //     this.lastMessageDate = date;
  //     // console.log('DATE: ', date);
  //     // console.log('DATESTRING DANACH: ', dateString);
  //     // debugger
  //     // console.log('FORMATDATE: ', formatDate(date, 'dd.MM.yyyy', 'de-DE'));
  //     const today = new Date();
  //     const yesterday = new Date();
  //     const dayBeforeYesterday = new Date();
  //     yesterday.setDate(today.getDate() - 1);
  //     dayBeforeYesterday.setDate(today.getDate() - 2);

  //     if (this.isSameDay(date, today)) {
  //       return 'Heute';
  //     } else if (this.isSameDay(date, yesterday)) {
  //       return 'Gestern';
  //     } else if (this.isSameDay(date, dayBeforeYesterday)) {
  //       return 'Vorgestern';
  //     } else {
  //       // console.log('FORMATDATE: ', formatDate(date, 'dd.MM.yyyy', 'de-DE'));

  //       return formatDate(date, 'dd.MM.yyyy', 'de-DE');
  //     }
  //   }
  //   return 'failure'
  // }

  // isSameDay(d1: Date, d2: Date): boolean {
  //   return d1.getFullYear() === d2.getFullYear() &&
  //     d1.getMonth() === d2.getMonth() &&
  //     d1.getDate() === d2.getDate();
  // }

  // getDateFromString(dateString: string) {
  //   dateString = dateString.replace(' um ', ' ');
  //   console.log('getDateFromString', new Date(dateString));
  //   return new Date(dateString);
  // }

  dummyThreatService = {
    messages: [{
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: '12.3.25',
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    }],
    chatMessage: {
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: '14.3.25',
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    }
  }

  fromCurrentUser(id: string): boolean {
    if (id === this.authService.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
