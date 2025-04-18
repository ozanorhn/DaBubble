import { Component } from '@angular/core';
import { ChannelsComponent } from "./channels/channels.component";
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { ChannelPageNavService } from '../../pageNavServices/channel-page-nav.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from "../shared/user/user.component";

import { User } from '../../classes/user.class';
import { Channel } from '../../classes/channel.class';


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
  constructor(public mainNavService: ChannelPageNavService){

  }

  isUser(item: any): item is User {
    return item instanceof User;
  }
  
  isChannel(item: any): item is Channel {
    return item instanceof Channel;
  }

}
