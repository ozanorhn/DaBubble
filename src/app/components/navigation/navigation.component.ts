import { Component } from '@angular/core';
import { ChannelsComponent } from "./channels/channels.component";
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';


@Component({
  selector: 'app-navigation',
  imports: [
    ChannelsComponent,
    DirectMessagesComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}
