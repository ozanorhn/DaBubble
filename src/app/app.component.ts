import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChannelPageNavService } from './pageNavServices/channel-page-nav.service';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dabubble';

  constructor(private channelPageNavService: ChannelPageNavService) {
    this.checkMobileView();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileView()
  }

  checkMobileView() {
    if (window.innerWidth >= 1024) {
      this.channelPageNavService.mobile = false;
    } else {
      this.channelPageNavService.mobile = true;
    }
  }
}
