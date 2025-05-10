import { Component, inject, Input, signal } from '@angular/core';
import { ChannelsService } from '../../../services/channels/channels.service';

import { CommonModule } from '@angular/common';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { OverlayService } from '../../../pageServices/overlays/overlay.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';

@Component({
  selector: 'app-chat-header',
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {

  constructor(
    public channelService: ChannelsService,
    public mainNavService: MainNavService,
    public overlayService: OverlayService,
    public dmService: DirectMessagesService
  ) {

  }
  @Input() chatType: 'new' | 'channel' | 'thread' | 'dm' = 'new';


  getChannelName() {
    setTimeout(() => {
      if (this.channelService.channels[this.channelService.currentIndex()].name) {
        return this.channelService.channels[this.channelService.currentIndex()].name;
      } else {
        return 'NameFail'
      }
    }, 1000);
  }


  openMembersOverlay(){
    console.log('open Members');
  }

  addMemberOverlay(){
    console.log('add Members');
    
  }


}
