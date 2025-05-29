import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../pageServices/filters/filter.service';
import { Channel } from '../../../classes/channel.class';
import { User } from '../../../classes/user.class';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    CommonModule,
    UserComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  devspace = ''

  constructor(
    public filterService: FilterService,
    public mainNavService: MainNavService
  ) { }

  user = new User();
  channel = new Channel();


  isUser(item: any): item is User {
    return 'name' in item && 'avatar' in item; // Anpassen an Ihre User-Properties
  }

  isChannel(item: any): item is Channel {
    return 'name' in item && 'id' in item; // Anpassen an Ihre Channel-Properties
  }


}
