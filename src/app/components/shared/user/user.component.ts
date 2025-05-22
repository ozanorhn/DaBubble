import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../classes/user.class';
import { ChannelsService } from '../../../services/channels/channels.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { Timestamp } from '@angular/fire/firestore';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  currentUser

  constructor(
    public channelService: ChannelsService,
    public localStorageS: LocalStorageService,
    public mainNavService: MainNavService,
    public userService: UsersService
  ) {
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }

  timeChecker = Timestamp.now();


  @Input() userInfo!: User;
  @Input() i = 0;

  isOnline = false;


  ngOnInit(): void {
    this.updateOnlineStatus();
    setInterval(() => this.updateOnlineStatus(), 5000); 
  }
  
  updateOnlineStatus() {
    if (this.userInfo) {
      
      this.isOnline = this.userService.isUserOnline(this.userInfo.online);
    }
  }


}
