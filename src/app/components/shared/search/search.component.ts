import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../pageServices/filters/filter.service';
import { Channel } from '../../../classes/channel.class';
import { User } from '../../../classes/user.class';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { UserComponent } from '../user/user.component';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { UsersService } from '../../../services/users/users.service';
import { ChannelsService } from '../../../services/channels/channels.service';
import { MessagesService } from '../../../services/messages/messages.service';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    CommonModule,
    // UserComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchInput = '';

  // devspace = ''

  constructor(
    public filterService: FilterService,
    public mainNavService: MainNavService,
    public dmService:DirectMessagesService,
    public usersService: UsersService,
    public channelsService: ChannelsService,
    public messagesService: MessagesService
  ) {
    // if (!this.dmService.searched) {
    //   this.dmService.getSearchableDMs();
    // }
  }


  checkSearchInput() {
    if (!this.dmService.searched) {
      this.dmService.getSearchableDMs();
    }
    let id = setTimeout(() => {
      console.log('# searchInput ',this.searchInput);
      console.log('# users ',this.usersService.users);
      console.log('# channels ',this.channelsService.channels);
      console.log('# DMs ',this.dmService.searchDMs);
      console.log('#','this.messagesService.messages()');
      clearTimeout(id);
    }, 100);
  }

  // user = new User();
  // channel = new Channel();


  // isUser(item: any): item is User {
  //   return 'name' in item && 'avatar' in item; // Anpassen an Ihre User-Properties
  // }

  // isChannel(item: any): item is Channel {
  //   return 'name' in item && 'id' in item; // Anpassen an Ihre Channel-Properties
  // }


  // clickUser(item:User){
  //   this.dmService.openDMs(item);
  //   this.mainNavService.openChannel(true);
  //   this.filterService.searchValue.set('');
  // }


}
