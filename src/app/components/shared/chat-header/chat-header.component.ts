import { Component, Input, OnInit, signal } from '@angular/core';
import { ChannelsService } from '../../../services/channels/channels.service';

import { CommonModule } from '@angular/common';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { OverlayService } from '../../../pageServices/overlays/overlay.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { Timestamp } from '@angular/fire/firestore';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-chat-header',
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent implements OnInit {

  constructor(
    public channelService: ChannelsService,
    public mainNavService: MainNavService,
    public overlayService: OverlayService,
    public dmService: DirectMessagesService,
    public userService: UsersService
  ) {
    // this.filterUser()
  }


  @Input() chatType: 'new' | 'channel' | 'thread' | 'dm' = 'new';


  // getChannelName() {
  //   setTimeout(() => {
  //     if (this.channelService.channels[this.channelService.currentIndex()].name) {
  //       return this.channelService.channels[this.channelService.currentIndex()].name;
  //     } else {
  //       return 'NameFail'
  //     }
  //   }, 1000);
  // }



  timeChecker = Timestamp.now();
  isOnline = false;


  ngOnInit(): void {
    setTimeout(() => {
      this.timeChecker = Timestamp.now();
      this.checkTimestampOnline();
    }, 1000)

    setInterval(() => {
      this.timeChecker = Timestamp.now();
      this.checkTimestampOnline();
    }, 10000)
  }


  filterUser() {
    let getUserStatus = this.userService.users.filter((user) => user.id == this.dmService.othertUser.id)
    return getUserStatus[0].online
  }


  checkTimestampOnline() {
    if (!this.filterUser() || !this.timeChecker) return;
    const now = this.timeChecker.toDate().getTime();
    const lastOnline = this.filterUser().toDate().getTime();
    const difference = now - lastOnline;
    if (difference > 20000) {
      // console.log(this.dmService.othertUser.name, 'User in Chat header is offline');
      this.isOnline = false;
    } else {
      console.log(this.dmService.othertUser.name, 'User in Chat header is online');
      this.isOnline = true;
    }
  }


}
