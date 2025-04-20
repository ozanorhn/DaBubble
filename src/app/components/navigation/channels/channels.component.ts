import { Component } from '@angular/core';
import { ChannelsService } from '../../../services/channels/channels.service';
import { ChannelPageNavService } from '../../../pageNavServices/channel-page-nav.service';



@Component({
  selector: 'app-channels',
  imports: [],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {


  constructor(public channelService: ChannelsService, public channelNavService: ChannelPageNavService, public channelPageNavService: ChannelPageNavService){}



  ngOnInit() {
    this.channelPageNavService.checkScreenView();
    window.addEventListener('resize', () => {
      this.channelPageNavService.checkScreenView();
    });
  }



  turnCannelArrow() {
    let arrow = document.getElementById('channel-arrow');
    arrow?.classList.toggle('-rotate-90');

    let list = document.getElementById('dropList');
    list?.classList.toggle('hidden');
  }


 




}
