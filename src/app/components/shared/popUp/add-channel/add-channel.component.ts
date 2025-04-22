import { Component } from '@angular/core';
import { ChannelPageNavService } from '../../../../pageNavServices/channel-page-nav.service';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';
import { Channel } from '../../../../classes/channel.class';


@Component({
  selector: 'app-add-channel',
  imports: [
    FormsModule
  ],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {

  constructor(public channelNavService: ChannelPageNavService, public channelService: ChannelsService) { }

  closeOverlay() {
    this.channelNavService.addUserPopup(); // toggelt das Signal
  }


  newChannel = {
    name: '',
    description: '',
  }



  createChannel() {
    this.channelService.channels.push(new Channel(this.newChannel));
  }




}
