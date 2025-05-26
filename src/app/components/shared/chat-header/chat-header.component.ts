import { Component, Input, OnInit, signal } from '@angular/core';
import { ChannelsService } from '../../../services/channels/channels.service';

import { CommonModule } from '@angular/common';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { OverlayService } from '../../../pageServices/overlays/overlay.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { doc, getDoc, Timestamp } from '@angular/fire/firestore';
import { UsersService } from '../../../services/users/users.service';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../pageServices/filters/filter.service';

@Component({
  selector: 'app-chat-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent implements OnInit {

  constructor(
    public channelService: ChannelsService,
    public mainNavService: MainNavService,
    public overlayService: OverlayService,
    public dmService: DirectMessagesService,
    public userService: UsersService,
    public filterService: FilterService
  ) { }


  @Input() chatType: 'new' | 'channel' | 'thread' | 'dm' = 'new';


  timeChecker = Timestamp.now();
  isOnline = false;


  ngOnInit(): void {
    this.updateOnlineStatus();
    setInterval(() => this.updateOnlineStatus(), 1000);

     // Setze den Zustand je nach chatType
  //this.filterService.isChatInputActive.set(this.chatType === 'new');
  }


  updateOnlineStatus() {
    const user = this.userService.users.find(u => u.id === this.dmService.otherUser.id);
    if (!user) {
      this.loadUserDirectly();
      return;
    }
    this.isOnline = this.userService.isUserOnline(user.online);
  }


  private async loadUserDirectly() {

    if (!this.dmService.otherUser?.id) {
      // console.error("otherUser or ID is missing!");
      return;
    }

    const userDoc = doc(this.userService.usersCollection, this.dmService.otherUser.id);
    const snapshot = await getDoc(userDoc);
    if (snapshot.exists()) {
      this.isOnline = this.userService.isUserOnline(snapshot.data()['online']);
    }
  }

}
