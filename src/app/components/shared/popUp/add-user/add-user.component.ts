import { Component } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../../pageServices/filters/filter.service';
import { UserComponent } from '../../user/user.component';
import { Channel } from '../../../../classes/channel.class';
import { LocalStorageService } from '../../../../services/localStorage/local-storage.service';
import { User } from '../../../../classes/user.class';

@Component({
  selector: 'app-add-user',
  imports: [
    CommonModule,
    FormsModule,
    UserComponent
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  currentUser;

  constructor(
    public overlayService: OverlayService,
    public channelService: ChannelsService,
    public filterService: FilterService,
    public localStorageS: LocalStorageService
  ) {
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }

  choiceInput = false

  selectAllMembers() {
    const allPicker = document.getElementById('all') as HTMLInputElement | null;
    const choiseUser = document.getElementById('choice') as HTMLInputElement | null;
    if (allPicker && choiseUser) {
      allPicker.checked = true;
      choiseUser.checked = false;
      this.choiceInput = false;
      this.channelService.choiceMembers.set(false);
    }
  }


  switchToManualMemberSelection() {
    const allPicker = document.getElementById('all') as HTMLInputElement | null;
    const choiseUser = document.getElementById('choice') as HTMLInputElement | null;
    if (allPicker && choiseUser) {
      allPicker.checked = false;
      choiseUser.checked = true;
      this.choiceInput = true
      this.channelService.choiceMembers.set(true);
    }
  }


  createChannelAndClose() {
    this.channelService.addChannel();
    this.overlayService.addUserOverlay();
    this.channelService.resetCreateChannel();
  }

}
