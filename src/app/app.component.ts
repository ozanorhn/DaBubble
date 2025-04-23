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
    this.channelPageNavService.checkScreenView();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.channelPageNavService.checkScreenView();
  }
}