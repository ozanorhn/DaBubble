import { Component, inject } from '@angular/core';
import { ChannelsService } from '../../../services/channels.service';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  channelService = inject(ChannelsService);

}
