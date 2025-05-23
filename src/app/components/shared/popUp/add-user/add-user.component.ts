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
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserComponent
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  errorMessage: string = '';
  choiceInput = false;
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

  choice() {
    const allPicker = document.getElementById('all') as HTMLInputElement | null;
    const choiseUser = document.getElementById('choice') as HTMLInputElement | null;
    if (allPicker && choiseUser) {
      allPicker.checked = true;
      choiseUser.checked = false;
      this.choiceInput = false;
      this.channelService.choiceMembers.set(false);
    }
  }

  checkAll() {
    const allPicker = document.getElementById('all') as HTMLInputElement | null;
    const choiseUser = document.getElementById('choice') as HTMLInputElement | null;
    if (allPicker && choiseUser) {
      allPicker.checked = false;
      choiseUser.checked = true;
      this.choiceInput = true;
      this.channelService.choiceMembers.set(true);
    }
  }

  async addChannel() {
    const error = await this.channelService.addChannel();

    if (error) {
      this.errorMessage = error;
      return;
    }

    this.errorMessage = ''; // clear any previous error
    this.overlayService.addUserOverlay();
    this.channelService.createChannel = new Channel({ createdBy: this.channelService.currentUser.id });

 /* addChannel() {
    this.channelService.addChannel();
    this.overlayService.addUserOverlay();
    this.channelService.resetCreateChannel();*/
  }
}
