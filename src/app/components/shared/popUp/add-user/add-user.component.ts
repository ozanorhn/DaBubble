import { Component } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../../pageServices/filters/filter.service';
import { UserComponent } from '../../user/user.component';
import { UsersService } from '../../../../services/users/users.service';
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

  choiceInput = false

  constructor(
    public overlayService: OverlayService,
    public channelService: ChannelsService,
    public filterService: FilterService,
    public usersService: UsersService
  ) { }


  selectAllMembers() {
    const allPicker = document.getElementById('all') as HTMLInputElement | null;
    const choiceUser = document.getElementById('choice') as HTMLInputElement | null;

    if (allPicker && choiceUser) {
      allPicker.checked = true;
      choiceUser.checked = false;
      this.choiceInput = false;
      this.channelService.choiceMembers.set(false);
    }
  }

  switchToManualMemberSelection() {
    const allPicker = document.getElementById('all') as HTMLInputElement | null;
    const choiceUser = document.getElementById('choice') as HTMLInputElement | null;

    if (allPicker && choiceUser) {
      allPicker.checked = false;
      choiceUser.checked = true;
      this.choiceInput = true;
      this.channelService.choiceMembers.set(true);
      this.channelService.channelTemplate.members = [this.usersService.currentUser.id];
    }
  }


  createChannelAndClose() {
    this.channelService.createNewChannel();
    this.overlayService.addUserOverlay();
    this.channelService.resetCreateChannel();
  }

  
}
