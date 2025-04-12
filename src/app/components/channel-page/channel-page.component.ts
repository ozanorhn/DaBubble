import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { SearchComponent } from "../shared/search/search.component";
import { ChannelsComponent } from "./channels/channels.component";
import { DirectMessagesComponent } from "./direct-messages/direct-messages.component";

@Component({
  selector: 'app-channel-page',
  imports: [HeaderComponent, SearchComponent, ChannelsComponent, DirectMessagesComponent],
  templateUrl: './channel-page.component.html',
  styleUrl: './channel-page.component.scss'
})
export class ChannelPageComponent {

}
