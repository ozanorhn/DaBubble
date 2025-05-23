import { Component } from '@angular/core';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';
import { Channel } from '../../../../classes/channel.class';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../../services/localStorage/local-storage.service';
import { User } from '../../../../classes/user.class';


@Component({
  selector: 'app-add-channel',
  imports: [
    FormsModule
  ],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {

  currentUser;

  constructor(
    public overlayService: OverlayService,
    public channelService: ChannelsService,
    public localStorageS: LocalStorageService
  ) {
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }


  closeOverlay() {
    this.overlayService.addCannelOverlay();
    this.channelService.resetCreateChannel();
  }


  openAddUser() {
    this.overlayService.addCannelOverlay()
    this.overlayService.addUserOverlay()
  }


}
