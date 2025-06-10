import { Component } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { User } from '../../../../classes/user.class';
import { deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { UsersService } from '../../../../services/users/users.service';

@Component({
  selector: 'app-confirm-leave-channel',
  imports: [],
  templateUrl: './confirm-leave-channel.component.html',
  styleUrl: './confirm-leave-channel.component.scss'
})
export class ConfirmLeaveChannelComponent {

  constructor(
    public overlayService: OverlayService,
    public channelService: ChannelsService,
    public usersService: UsersService
  ) { }


  async leaveChannel() {
    let currentChannel = this.channelService.channels[this.channelService.selectedChannelIndex()]
    let idToRemove = this.usersService.currentUser?.id
    const updatedIds = currentChannel.members.filter(id => id !== idToRemove);

    if (updatedIds.length > 0) {
      await updateDoc(
        doc(this.channelService.channelsCollection, currentChannel.id),
        {
          members: updatedIds
        }
      );
    } else {
      await deleteDoc(doc(this.channelService.channelsCollection, currentChannel.id));
    }
  }



}
