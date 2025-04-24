import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AddUser1Component } from "../shared/popUp/add-user1/add-user1.component";
import { AddChannelComponent } from "../shared/popUp/add-channel/add-channel.component";
import { CommonModule } from '@angular/common';
import { ChatMessagesComponent } from "../shared/chat-messages/chat-messages.component";
import { ChatHeaderComponent } from "../shared/chat-header/chat-header.component";
import { ChatInputComponent } from "../shared/chat-input/chat-input.component";
import { ChannelsService } from '../../services/channels/channels.service';
import { SearchComponent } from "../shared/search/search.component";
import { EditChannelComponent } from "../shared/popUp/edit-channel/edit-channel.component";
import { MainNavService } from '../../pageServices/navigates/main-nav.service';
import { OverlayService } from '../../pageServices/overlays/overlay.service';
import { ThreadComponent } from './thread/thread.component';

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
    ChatInputComponent,
    SearchComponent,
    EditChannelComponent,
    ThreadComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  showMessagesOnly = false;

  dummyThreatService = {
    messages: [{
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: 12,
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    }],
    chatMessage: {
      id: 'string',
      message: 'string',
      sender: 'Florian Rauh',
      timestamp: 12,
      createdBy: 'string',
      reactions: [{
        id: 0,
        users: ['Sandra Peters'],
      }],
      threadId: 'string',
      channelId: 'string',
    }
  }

  constructor(
    public mainNavService: MainNavService,
    public channelService: ChannelsService,
    public overlayService: OverlayService
  ) { }


  toggleMessagesView() {
    this.showMessagesOnly = !this.showMessagesOnly;
  }
}
