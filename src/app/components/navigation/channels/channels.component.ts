import { Component } from '@angular/core';
import { ChannelsService } from '../../../services/channels/channels.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { OverlayService } from '../../../pageServices/overlays/overlay.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channels',
  imports: [
    CommonModule
  ],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {


  constructor(
    public channelService: ChannelsService,
    public mainNavService: MainNavService,
    public messageService: MessagesService,
    public overlayService: OverlayService) { }


  ngOnInit() {
    this.mainNavService.checkScreenView();
    window.addEventListener('resize', () => {
      this.mainNavService.checkScreenView();
    });
  }


  turnCannelArrow() {
    let arrow = document.getElementById('channel-arrow');
    arrow?.classList.toggle('-rotate-90');
    let list = document.getElementById('dropList');
    list?.classList.toggle('hidden');
  }


}
