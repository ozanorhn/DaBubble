import { Injectable, signal } from '@angular/core';
import { ChannelsService } from '../../services/channels/channels.service';
import { Channel } from '../../classes/channel.class';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../classes/user.class';

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
  profileObj: User = new User();
  hideLogoutOverlay = true;
  hideMembersOverlay = true;
  hideAddMembersOverlay = true;
  hideConfirmLeaveChannel = true;


  constructor(
    public channelsService: ChannelsService,
    public userService: UsersService
  ) { }


  addCannelOverlay() {
    this.hideAddChannel = !this.hideAddChannel
  }


  addUserOverlay() {
    this.hideAddUser = !this.hideAddUser;
    this.channelsService.channelTemplate.members = [];
  }


  editChannel() {
    this.hideEditChannel = !this.hideEditChannel
  }


  profileOverlay(UserView: boolean, currentProfile: {}) {
    if (this.hideProfileOverlay) {
      this.editProfil = false;
      this.profileObj = currentProfile as User
    }
    this.hideProfileOverlay = !this.hideProfileOverlay
    this.usersProfilView = UserView;
  }


  editProfileView() {
    this.editProfil = !this.editProfil
  }


  logoutOvelay() {
    this.hideLogoutOverlay = !this.hideLogoutOverlay
  }


  membersOverlay() {
    this.hideMembersOverlay = !this.hideMembersOverlay
  }


  addMembersOverlay() {
    this.hideAddMembersOverlay = !this.hideAddMembersOverlay
  }

  confirmLeaveChannel() {
    this.hideConfirmLeaveChannel = !this.hideConfirmLeaveChannel
  }
}