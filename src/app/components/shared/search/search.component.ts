import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../pageServices/filters/filter.service';
import { Channel } from '../../../classes/channel.class';
import { User } from '../../../classes/user.class';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { UserComponent } from '../user/user.component';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { ChannelsService } from '../../../services/channels/channels.service';
import { MessagesService } from '../../../services/messages/messages.service';

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

  currentUser;

  constructor(
    public filterService: FilterService,
    public mainNavService: MainNavService,
    public dmService: DirectMessagesService,
    public localStorageS: LocalStorageService,
    public channelService: ChannelsService,
    public messageService: MessagesService
  ) {
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }

  user = new User();
  channel = new Channel();


  isUser(item: any): item is User {
    return 'name' in item && 'avatar' in item; // Anpassen an Ihre User-Properties
  }

  isChannel(item: any): item is Channel {
    return 'name' in item && 'id' in item; // Anpassen an Ihre Channel-Properties
  }


  clickUser(item: User) {
    this.dmService.openDMs(item);
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
    return channel.members.some(memberId => memberId === this.currentUser.id);
  }


}
