import { Component } from '@angular/core';
import { ChannelsComponent } from "./channels/channels.component";
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from "../shared/user/user.component";
import { User } from '../../classes/user.class';
import { Channel } from '../../classes/channel.class';
import { MainNavService } from '../../pageServices/navigates/main-nav.service';
import { FilterService } from '../../pageServices/filters/filter.service';
import { ThreadsService } from '../../services/threads/threads.service';
import { DirectMessagesService } from '../../services/directMessages/direct-messages.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { ChannelsService } from '../../services/channels/channels.service';
import { MessagesService } from '../../services/messages/messages.service';


@Component({
  selector: 'app-navigation',
  imports: [
    ChannelsComponent,
    DirectMessagesComponent,
    CommonModule,
    UserComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  currentUser;

  constructor(
    public threadService: ThreadsService,
    public mainNavService: MainNavService,
    public filterService: FilterService,
    public directMessageService: DirectMessagesService,
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

  isMember(channel: Channel): boolean {
    return channel.members.some(memberId => memberId === this.currentUser.id);
  }


  clickUser(item: User) {
    this.directMessageService.openDMs(item);
    this.mainNavService.openChannel(true);
    this.filterService.searchValue.set('')
  }


  clickChannel(item: Channel) {
    this.mainNavService.openChannel();
    this.channelService.openChannel(item);
    this.messageService.getMessages(item);
    this.mainNavService.markedChannel(item);
    this.filterService.searchValue.set('');
  }


}
