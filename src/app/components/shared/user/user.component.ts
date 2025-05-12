import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../classes/user.class';
import { ChannelsService } from '../../../services/channels/channels.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { Timestamp } from '@angular/fire/firestore';

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
    public mainNavService: MainNavService
  ) {
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
    // this.checkTimestampOnline();
  }

  timeChecker = Timestamp.now();

  ngOnInit(): void {

    setTimeout(() => {
      this.checkTimestampOnline();
    }, 1000)

    setInterval(() => {
      this.timeChecker = Timestamp.now();
      this.checkTimestampOnline();
    }, 30000)
  }

  @Input() userInfo!: User;
  @Input() i = 0;

  isOnline = false;

  checkTimestampOnline() {
    if (!this.userInfo.online || !this.timeChecker) return;
    const now = this.timeChecker.toDate().getTime();
    const lastOnline = this.userInfo.online.toDate().getTime();
    const difference = now - lastOnline;
    if (difference > 60000) {
      console.log(this.userInfo.name, 'User ist offline');
      this.isOnline = false;
    } else {
      console.log(this.userInfo.name, 'User ist online');
      this.isOnline = true;
    }
  }





}
