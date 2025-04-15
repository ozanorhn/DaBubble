import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { SearchComponent } from "../shared/search/search.component";
import { ThreadsComponent } from "./threads/threads.component";
import { AddChannelComponent } from "../shared/popUp/add-channel/add-channel.component";

@Component({
  selector: 'app-channel-page',

  standalone: true,

  imports: [HeaderComponent, SearchComponent, ThreadsComponent, AddChannelComponent],

  templateUrl: './channel-page.component.html',
  styleUrl: './channel-page.component.scss'
})
export class ChannelPageComponent {

}
