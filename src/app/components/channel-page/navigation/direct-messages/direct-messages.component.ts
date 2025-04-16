import { Component } from '@angular/core';
import { UserComponent } from '../../../shared/user/user.component';
import { UsersService } from '../../../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { ChannelPageNavService } from '../../../../pageNavServices/channel-page-nav.service';


@Component({
  selector: 'app-direct-messages',
  imports: [
    UserComponent,
    CommonModule,
  ],
  templateUrl: './direct-messages.component.html',
  styleUrl: './direct-messages.component.scss'
})
export class DirectMessagesComponent {

  constructor(public userService: UsersService, public channelPageServive: ChannelPageNavService){}


  directMessagesToggle() {
    let directMessageArrow = document.getElementById('driectArrow');
    directMessageArrow?.classList.toggle('-rotate-90');

    let directMessageList = document.getElementById('directList');
    directMessageList?.classList.toggle('hidden');
  }

}
