import { Component } from '@angular/core';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-channel',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {

  nameError = false;

  constructor(
    public overlayService: OverlayService,
    public channelService: ChannelsService,
  ) { }


  closeChannelCreationDialog() {
    this.overlayService.addCannelOverlay();
    this.channelService.resetCreateChannel();
    this.nameError = false;
  }


  navigateToMemberSelection() {
    if (this.channelNameExists()) {
      this.nameError = true;
      return;
    }
    this.nameError = false;
    this.overlayService.addCannelOverlay();
    this.overlayService.addUserOverlay();
  }

  channelNameExists(): boolean {
    const name = this.channelService.channelTemplate.name?.trim().toLowerCase();
    if (!name) return false;
    return this.channelService.channels.some(channel => channel.name?.trim().toLowerCase() === name);
  }
  
}
