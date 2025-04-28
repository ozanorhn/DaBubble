import { Component } from '@angular/core';
import { UserComponent } from '../../shared/user/user.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/users.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';




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

  constructor(public userService: UsersService, public mainNavService: MainNavService) { }


  directMessagesToggle() {
    let directMessageArrow = document.getElementById('driectArrow');
    directMessageArrow?.classList.toggle('-rotate-90');

    let directMessageList = document.getElementById('directList');
    directMessageList?.classList.toggle('hidden');
  }

}
