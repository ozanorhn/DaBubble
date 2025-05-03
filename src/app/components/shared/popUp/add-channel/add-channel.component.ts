import { Component } from '@angular/core';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';
import { Channel } from '../../../../classes/channel.class';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';


@Component({
  selector: 'app-add-channel',
  imports: [
    FormsModule
  ],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {

  constructor(public overlayService: OverlayService, public channelService: ChannelsService) { }

  closeOverlay() {
    this.overlayService.addUserOverlay(); // toggelt das Signal
  }



  openAddUser(){
    this.overlayService.addCannelOverlay()
    this.overlayService.addUserOverlay()
  }



  // createChannel() {
  //   this.channelService.channels.push(new Channel(this.newChannel));
  // }




}
