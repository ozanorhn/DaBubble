import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { SearchComponent } from "../shared/search/search.component";
import { ThreadsComponent } from "./threads/threads.component";
import { AddChannelComponent } from "../shared/popUp/add-channel/add-channel.component";
import { ChannelPageNavService } from '../../pageNavServices/channel-page-nav.service';
import { CommonModule } from '@angular/common';
import { AddUser1Component } from "../shared/popUp/add-user1/add-user1.component";

@Component({
  selector: 'app-channel-page',

  standalone: true,

  imports: [
    HeaderComponent,
    SearchComponent,
    ThreadsComponent,
    AddChannelComponent,
    CommonModule,
    AddUser1Component
],

  templateUrl: './channel-page.component.html',
  styleUrl: './channel-page.component.scss'
})
export class ChannelPageComponent {


  constructor(public channelNavService: ChannelPageNavService) { }




}
