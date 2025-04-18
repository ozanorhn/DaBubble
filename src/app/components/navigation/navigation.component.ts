import { Component } from '@angular/core';
import { ChannelsComponent } from "./channels/channels.component";
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { ChannelPageNavService } from '../../pageNavServices/channel-page-nav.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navigation',
  imports: [
    ChannelsComponent,
    DirectMessagesComponent,
    CommonModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(public mainNavService: ChannelPageNavService){

  }

}
