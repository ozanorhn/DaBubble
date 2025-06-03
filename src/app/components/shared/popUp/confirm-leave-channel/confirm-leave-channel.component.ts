import { Component } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { doc, updateDoc } from '@angular/fire/firestore';
import { UsersService } from '../../../../services/users/users.service';

@Component({
  selector: 'app-confirm-leave-channel',
  imports: [],
  templateUrl: './confirm-leave-channel.component.html',
  styleUrl: './confirm-leave-channel.component.scss'
})
export class ConfirmLeaveChannelComponent {


  // currentUser;

  constructor(
    public overlayService: OverlayService,
    public channelService: ChannelsService,
    public usersService: UsersService
  ) { }





  async leaveChannel() {
    let currentChannel = this.channelService.channels[this.channelService.currentIndex()]
    let idToRemove = this.usersService.currentUser.id
    const updatedIds = currentChannel.members.filter(id => id !== idToRemove);
    console.log(updatedIds);

    await updateDoc(
          doc(this.channelService.channelsCollection, currentChannel.id),
          {
            members: updatedIds
          }
        );

  }



}
