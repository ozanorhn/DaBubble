import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChannelPageNavService } from '../../../pageNavServices/channel-page-nav.service';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  devspace = ''

  constructor(public mainNavService: ChannelPageNavService) {}


}
