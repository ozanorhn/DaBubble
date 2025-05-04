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
  usersProfilView = false;
  editProfil = false;

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


  profileOverlay(UserView: boolean){
    if(this.hideProfileOverlay){
      this.editProfil = false;
    }
    this.hideProfileOverlay = !this.hideProfileOverlay
    this.usersProfilView = UserView;
  }

  editProfileView() {
    this.editProfil = !this.editProfil
  }


  logoutOvelay(){
    this.hideLogoutOverlay =  !this.hideLogoutOverlay
  }


}
