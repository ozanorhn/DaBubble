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
  constructor(
    public threadService: ThreadsService,
    public mainNavService: MainNavService,
    public filterService: FilterService,
    public directMessageService: DirectMessagesService,
  ) { }

  user = new User();
  channel = new Channel();


  isUser(item: any): item is User {
    return 'name' in item && 'avatar' in item; // Anpassen an Ihre User-Properties
  }

  isChannel(item: any): item is Channel {
    return 'name' in item && 'id' in item; // Anpassen an Ihre Channel-Properties
  }


}
