import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { SearchComponent } from "../shared/search/search.component";
import { ChannelsComponent } from "./channels/channels.component";
import { DirectMessagesComponent } from "./direct-messages/direct-messages.component";
import { ThreadsComponent } from "./threads/threads.component";

@Component({
  selector: 'app-channel-page',

  standalone: true,

  imports: [HeaderComponent, SearchComponent, ThreadsComponent],

  templateUrl: './channel-page.component.html',
  styleUrl: './channel-page.component.scss'
})
export class ChannelPageComponent {

}
