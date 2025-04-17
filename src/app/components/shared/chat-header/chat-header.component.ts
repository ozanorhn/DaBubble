import { Component, inject, Input } from '@angular/core';
import { ChannelsService } from '../../../services/channels/channels.service';
import { ChannelPageNavService } from '../../../pageNavServices/channel-page-nav.service';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  channelService = inject(ChannelsService);
  channelNavService = inject(ChannelPageNavService);
  @Input()chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = '';

}
