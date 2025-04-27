import { Injectable, signal } from '@angular/core';
import { ChannelsService } from '../../services/channels/channels.service';
import { Channel } from '../../classes/channel.class';
import { UsersService } from '../../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {


  hideAddChannelPopUp = signal(true);
  hideAddUserPopUp = signal(true);
  hideEditChannelPopUp = signal(true);

  hideProfileOverlay = true;

  hideLogoutOverlay = true;




  constructor(
    public channelsService: ChannelsService,
    public userService: UsersService
  ) { }




  //////////////////////////
  /// Geht in den ChannelService 
  newChannel = {
    name: '',
    description: '',
    members: [{
      name: "Nicolas Developer",
      email: "nicolas@test.com",
      createdAt: {
        seconds: 1745499997,
        nanoseconds: 173000000
      },
      avatar: "/assets/imgs/avatar6.svg",
      online: false,
      id: "6xN38YGFasqdAqssgnO9"
    }]
  }

  createChannel() {
    this.channelsService.channels.push(new Channel(this.newChannel));
    this.channelsService.addChannel(new Channel(this.newChannel));
    console.log('My added Channel obj', this.newChannel);
  }
  ///////////////////////////////////////////////////////////



  addCannelPopup() {
    this.hideAddChannelPopUp.update(popup => !popup);
  }

  addUserPopup() {
    this.hideAddUserPopUp.update(popup => !popup);
  }

  editChannelPopup() {
    this.hideEditChannelPopUp.update(popup => !popup);
  }


  profileOverlay(){
    this.hideProfileOverlay = !this.hideProfileOverlay
  }

  logoutOvelay(){
    this.hideLogoutOverlay =  !this.hideLogoutOverlay
  }




}
