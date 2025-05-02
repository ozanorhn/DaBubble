import { Injectable, signal } from '@angular/core';
import { ChannelsService } from '../../services/channels/channels.service';
import { Channel } from '../../classes/channel.class';
import { UsersService } from '../../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  hideAddChannel = true;
  hideAddUser = true;
  hideEditChannel = true;
  hideProfileOverlay = true;
  hideLogoutOverlay = true;

  constructor(
    public channelsService: ChannelsService,
    public userService: UsersService
  ) { }


  addCannelOverlay() {
    this.hideAddChannel = !this.hideAddChannel
  }


  addUserOverlay() {
    this.hideAddUser = !this.hideAddUser;
  }


  editChannel() {
    this.hideEditChannel = !this.hideEditChannel
  }


  profileOverlay(){
    this.hideProfileOverlay = !this.hideProfileOverlay
  }


  logoutOvelay(){
    this.hideLogoutOverlay =  !this.hideLogoutOverlay
  }


}
