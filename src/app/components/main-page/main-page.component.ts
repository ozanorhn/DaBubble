import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { ChannelPageNavService } from '../../pageNavServices/channel-page-nav.service';
import { AddUser1Component } from "../shared/popUp/add-user1/add-user1.component";
import { AddChannelComponent } from "../shared/popUp/add-channel/add-channel.component";
import { CommonModule } from '@angular/common';
import { ChatMessagesComponent } from "../shared/chat-messages/chat-messages.component";
import { ChatHeaderComponent } from "../shared/chat-header/chat-header.component";
import { ChatInputComponent } from "../shared/chat-input/chat-input.component";

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    NavigationComponent,
    AddUser1Component,
    AddChannelComponent,
    CommonModule,
    ChatMessagesComponent,
    ChatHeaderComponent,
    ChatInputComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {


  constructor(public channelNavService: ChannelPageNavService) { }

}
