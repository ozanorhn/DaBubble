import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../classes/user.class';
import { ChannelsService } from '../../../services/channels/channels.service';
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
  timeChecker = Timestamp.now();
  isOnline = false;
  @Input() userInfo!: User;
  @Input() i = 0;


  constructor(
    public channelService: ChannelsService,
    public mainNavService: MainNavService,
    public userService: UsersService
  ) { }


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