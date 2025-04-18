import { Component } from '@angular/core';
import { ChannelPageNavService } from '../../../../pageNavServices/channel-page-nav.service';


@Component({
  selector: 'app-add-channel',
  imports: [],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {

  constructor(public channelNavService: ChannelPageNavService) { }

  closeOverlay() {
    this.channelNavService.addUserPopup(); // toggelt das Signal
  }

}
