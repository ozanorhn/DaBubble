import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { ChannelPageComponent } from './components/channel-page/channel-page.component';




@Component({
  selector: 'app-root',
  imports: [

    RouterOutlet

],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dabubble';
}
