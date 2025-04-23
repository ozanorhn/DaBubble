import { Injectable, signal } from '@angular/core';
import { ChannelsService } from '../../services/channels/channels.service';
import { Channel } from '../../classes/channel.class';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  hideAddChannelPopUp = signal(true);
  hideAddUserPopUp = signal(true);
  hideEditChannelPopUp = signal(true);

  newChannel = {
    name: '',
    description: '',
  }

  constructor(public channelsService: ChannelsService) { }

  
  addCannelPopup() {
    this.hideAddChannelPopUp.update(popup => !popup);
  }

  addUserPopup() {
    this.hideAddUserPopUp.update(popup => !popup);
  }

  editChannelPopup() {
    this.hideEditChannelPopUp.update(popup => !popup);
  }

  createChannel() {
    this.channelsService.channels.push(new Channel(this.newChannel));
    this.channelsService.addChannel(new Channel(this.newChannel));
  }

}
