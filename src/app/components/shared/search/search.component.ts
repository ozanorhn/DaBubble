import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../pageServices/filters/filter.service';
import { Channel } from '../../../classes/channel.class';
import { User } from '../../../classes/user.class';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { UserComponent } from '../user/user.component';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { ChannelsService } from '../../../services/channels/channels.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { Message } from '../../../classes/message.class';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    CommonModule,
    UserComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  devspace = ''


  constructor(
    public filterService: FilterService,
    public mainNavService: MainNavService,
    public dmService: DirectMessagesService,
    public channelService: ChannelsService,
    public messageService: MessagesService,
    public usersService: UsersService
  ) { }

  user = new User();
  channel = new Channel();


  isUser(item: any): item is User {
    return 'name' in item && 'avatar' in item; // Anpassen an Ihre User-Properties
  }

  isChannel(item: any): item is Channel {
    return 'name' in item && 'id' in item; // Anpassen an Ihre Channel-Properties
  }


  clickUser(item: User) {
    this.dmService.openOrCreateDirectMessageConversation(item);
    this.mainNavService.openChannel(true);
    this.filterService.searchValue.set('');
  }


  clickChannel(item: Channel) {
    this.mainNavService.openChannel();
    this.channelService.openChannel(item);
    this.messageService.getMessages(item);
    this.mainNavService.markedChannel(item);
    this.filterService.searchValue.set('')
  }


  isMember(channel: Channel): boolean {
    return channel.members.some(memberId => memberId === this.usersService.currentUser.id);
  }






  isMessage(item: any): item is Message {
    return 'message' in item && 'timestamp' in item;
  }

  clickMessage(item: any) {
    if (item.type === 'channelMessage') {
      const channel = this.channelService.channels.find(c => c.id === item.channelId);
      if (channel) {
        this.channelService.openChannel(channel);
        this.messageService.getMessages(channel);
        // Optional: Scroll zur spezifischen Nachricht
        setTimeout(() => {
          const element = document.getElementById(`message-${item.id}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element?.classList.add('highlight-message');
          setTimeout(() => element?.classList.remove('highlight-message'), 2000);
        }, 500);
      }
    } else if (item.type === 'dmMessage') {
      const userId = item.sender === this.usersService.currentUser.id ?
        this.dmService.directMessage.participants.user2 :
        this.dmService.directMessage.participants.user1;
      const user = this.usersService.users.find(u => u.id === userId);
      if (user) {
        this.dmService.openOrCreateDirectMessageConversation(user);
        // Ähnliches Scroll-Verhalten für DMs
      }
    }
    this.filterService.searchValue.set('');
  }



}
